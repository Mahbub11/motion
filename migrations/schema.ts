import { pgTable, foreignKey, uuid, timestamp, text, boolean, bigint, integer, jsonb, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const pricingPlanInterval = pgEnum("pricing_plan_interval", ['year', 'month', 'week', 'day'])
export const pricingType = pgEnum("pricing_type", ['recurring', 'one_time'])
export const subscriptionStatus = pgEnum("subscription_status", ['unpaid', 'past_due', 'incomplete_expired', 'incomplete', 'canceled', 'active', 'trialing'])


export const collaborators = pgTable("collaborators", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	workspaceId: uuid("workspace_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	userId: uuid("user_id").notNull(),
}, (table) => {
	return {
		collaboratorsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "collaborators_user_id_users_id_fk"
		}).onDelete("cascade"),
		collaboratorsWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [workspaces.id],
			name: "collaborators_workspace_id_workspaces_id_fk"
		}).onDelete("cascade"),
	}
});

export const prices = pgTable("prices", {
	id: text().primaryKey().notNull(),
	productId: text("product_id"),
	active: boolean(),
	description: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	unitAmount: bigint("unit_amount", { mode: "number" }),
	currency: text(),
	type: pricingType(),
	interval: pricingPlanInterval(),
	intervalCount: integer("interval_count"),
	trialPeriodDays: integer("trial_period_days"),
	metadata: jsonb(),
}, (table) => {
	return {
		pricesProductIdProductsIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "prices_product_id_products_id_fk"
		}),
	}
});

export const products = pgTable("products", {
	id: text().primaryKey().notNull(),
	active: boolean(),
	name: text(),
	description: text(),
	image: text(),
	metadata: jsonb(),
});

export const folders = pgTable("folders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	title: text().notNull(),
	iconId: text("icon_id").notNull(),
	data: text(),
	inTrash: text("in_trash"),
	bannerUrl: text("banner_url"),
	workspaceId: uuid("workspace_id").notNull(),
}, (table) => {
	return {
		foldersWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [workspaces.id],
			name: "folders_workspace_id_workspaces_id_fk"
		}).onDelete("cascade"),
	}
});

export const subscriptions = pgTable("subscriptions", {
	id: text().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	status: subscriptionStatus(),
	metadata: jsonb(),
	priceId: text("price_id"),
	quantity: integer(),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	created: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).defaultNow(),
	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => {
	return {
		subscriptionsPriceIdPricesIdFk: foreignKey({
			columns: [table.priceId],
			foreignColumns: [prices.id],
			name: "subscriptions_price_id_prices_id_fk"
		}),
	}
});

export const workspaces = pgTable("workspaces", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	workspaceOwner: uuid("workspace_owner").notNull(),
	title: text().notNull(),
	iconId: text("icon_id").notNull(),
	data: text(),
	inTrash: text("in_trash"),
	logo: text(),
	bannerUrl: text("banner_url"),
});

export const users = pgTable("users", {
	id: uuid().primaryKey().notNull(),
	fullName: text("full_name"),
	avatarUrl: text("avatar_url"),
	billingAddress: jsonb("billing_address"),
	paymentMethod: jsonb("payment_method"),
	email: text(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }),
});

export const files = pgTable("files", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	title: text().notNull(),
	iconId: text("icon_id").notNull(),
	data: text(),
	inTrash: text("in_trash"),
	bannerUrl: text("banner_url"),
	workspaceId: uuid("workspace_id").notNull(),
	folderId: uuid("folder_id").notNull(),
}, (table) => {
	return {
		filesFolderIdFoldersIdFk: foreignKey({
			columns: [table.folderId],
			foreignColumns: [folders.id],
			name: "files_folder_id_folders_id_fk"
		}).onDelete("cascade"),
		filesWorkspaceIdWorkspacesIdFk: foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [workspaces.id],
			name: "files_workspace_id_workspaces_id_fk"
		}).onDelete("cascade"),
	}
});

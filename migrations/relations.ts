import { relations } from "drizzle-orm/relations";
import { users, collaborators, workspaces, products, prices, folders, subscriptions, files } from "./schema";

export const collaboratorsRelations = relations(collaborators, ({one}) => ({
	user: one(users, {
		fields: [collaborators.userId],
		references: [users.id]
	}),
	workspace: one(workspaces, {
		fields: [collaborators.workspaceId],
		references: [workspaces.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	collaborators: many(collaborators),
}));

export const workspacesRelations = relations(workspaces, ({many}) => ({
	collaborators: many(collaborators),
	folders: many(folders),
	files: many(files),
}));

export const pricesRelations = relations(prices, ({one, many}) => ({
	product: one(products, {
		fields: [prices.productId],
		references: [products.id]
	}),
	subscriptions: many(subscriptions),
}));

export const productsRelations = relations(products, ({many}) => ({
	prices: many(prices),
}));

export const foldersRelations = relations(folders, ({one, many}) => ({
	workspace: one(workspaces, {
		fields: [folders.workspaceId],
		references: [workspaces.id]
	}),
	files: many(files),
}));

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
	price: one(prices, {
		fields: [subscriptions.priceId],
		references: [prices.id]
	}),
}));

export const filesRelations = relations(files, ({one}) => ({
	folder: one(folders, {
		fields: [files.folderId],
		references: [folders.id]
	}),
	workspace: one(workspaces, {
		fields: [files.workspaceId],
		references: [workspaces.id]
	}),
}));
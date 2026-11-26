"use client";

/*
 * PROTOTYPE DATA ONLY. localStorage is not a production database.
 * All option labels, service promises, turnaround values and payment terms
 * remain dummy values pending written confirmation from the studio.
 */
export const CUSTOM_ORDER_STATUSES = [
  "SUBMITTED",
  "QUOTE_SENT",
  "QUOTE_APPROVED",
  "DEPOSIT_PAID",
  "IN_PRODUCTION",
  "FITTING",
  "READY",
  "DELIVERED",
] as const;

export type CustomOrderStatus = typeof CUSTOM_ORDER_STATUSES[number];

export interface DemoOrder {
  id: string;
  userId: string;
  reference: string;
  items: Array<{ productId: string; name: string; size?: string; color?: string; quantity: number; unitPrice: number }>;
  status: "PLACED" | "PROCESSING" | "FULFILMENT" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
}

export interface DemoCustomRequest {
  id: string;
  userId: string;
  reference: string;
  status: CustomOrderStatus;
  selections: Record<string, unknown>;
  customer: { name: string; email: string; phone: string };
  quote?: { amount: number; currency: string; productionTime: string; message?: string; sentAt: string };
  createdAt: string;
  updatedAt: string;
}

interface DemoStoreShape {
  ordersByUser: Record<string, DemoOrder[]>;
  customRequestsByUser: Record<string, DemoCustomRequest[]>;
  draftsByOwner: Record<string, Record<string, unknown>>;
}

const STORE_KEY = "ayc-demo-commerce-store-v1";

function emptyStore(): DemoStoreShape {
  return { ordersByUser: {}, customRequestsByUser: {}, draftsByOwner: {} };
}

function readStore(): DemoStoreShape {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<DemoStoreShape>;
    return {
      ordersByUser: parsed.ordersByUser ?? {},
      customRequestsByUser: parsed.customRequestsByUser ?? {},
      draftsByOwner: parsed.draftsByOwner ?? {},
    };
  } catch {
    return emptyStore();
  }
}

function writeStore(store: DemoStoreShape) {
  window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function reference(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function saveCustomRequest(
  userId: string,
  customer: DemoCustomRequest["customer"],
  selections: Record<string, unknown>,
): DemoCustomRequest {
  const store = readStore();
  const now = new Date().toISOString();
  const request: DemoCustomRequest = {
    id: crypto.randomUUID(),
    userId,
    reference: reference("AYC"),
    status: "SUBMITTED",
    selections,
    customer,
    createdAt: now,
    updatedAt: now,
  };
  store.customRequestsByUser[userId] = [request, ...(store.customRequestsByUser[userId] ?? [])];
  writeStore(store);
  return request;
}


export function approveCustomQuote(userId: string, requestId: string): DemoCustomRequest | null {
  const store = readStore();
  const requests = store.customRequestsByUser[userId] ?? [];
  const index = requests.findIndex((request) => request.id === requestId);
  if (index < 0 || !requests[index].quote || requests[index].status !== "QUOTE_SENT") return null;
  const updated: DemoCustomRequest = {
    ...requests[index],
    status: "QUOTE_APPROVED",
    updatedAt: new Date().toISOString(),
  };
  requests[index] = updated;
  store.customRequestsByUser[userId] = requests;
  writeStore(store);
  return updated;
}

export function getCustomRequests(userId: string): DemoCustomRequest[] {
  return readStore().customRequestsByUser[userId] ?? [];
}


export function saveDemoOrder(
  userId: string,
  items: DemoOrder["items"],
): DemoOrder {
  const store = readStore();
  const now = new Date().toISOString();
  const order: DemoOrder = {
    id: crypto.randomUUID(),
    userId,
    reference: reference("AYO"),
    items,
    status: "PLACED",
    createdAt: now,
    updatedAt: now,
  };
  store.ordersByUser[userId] = [order, ...(store.ordersByUser[userId] ?? [])];
  writeStore(store);
  return order;
}

export function getDemoOrders(userId: string): DemoOrder[] {
  return readStore().ordersByUser[userId] ?? [];
}

export function saveDraft(ownerId: string, draft: Record<string, unknown>) {
  const store = readStore();
  store.draftsByOwner[ownerId] = draft;
  writeStore(store);
}

export function getDraft(ownerId: string): Record<string, unknown> | null {
  return readStore().draftsByOwner[ownerId] ?? null;
}

export function clearDraft(ownerId: string) {
  const store = readStore();
  delete store.draftsByOwner[ownerId];
  writeStore(store);
}

export function moveGuestDraftToUser(userId: string) {
  const store = readStore();
  if (!store.draftsByOwner[userId] && store.draftsByOwner.guest) {
    store.draftsByOwner[userId] = store.draftsByOwner.guest;
    delete store.draftsByOwner.guest;
    writeStore(store);
  }
}

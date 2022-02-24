
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum IncidentStatus {
    INVESTIGATING = "INVESTIGATING",
    IDENTIFIED = "IDENTIFIED",
    MONITORING = "MONITORING",
    RESOLVED = "RESOLVED"
}

export enum IncidentSeverity {
    CRITICAL = "CRITICAL",
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export enum ServiceStatus {
    OPERATIONAL = "OPERATIONAL",
    PARTIAL_OUTAGE = "PARTIAL_OUTAGE",
    MAJOR_OUTAGE = "MAJOR_OUTAGE"
}

export enum Role {
    ADMIN = "ADMIN",
    EDITOR = "EDITOR",
    VIEWER = "VIEWER"
}

export interface CreateActionItemInput {
    text: string;
    ownerId?: Nullable<string>;
    incidentId?: Nullable<string>;
}

export interface UpdateActionItemInput {
    id: string;
    text?: Nullable<string>;
    ownerId?: Nullable<string>;
}

export interface CreateEventInput {
    text: string;
    incidentId?: Nullable<string>;
}

export interface UpdateEventInput {
    id: string;
    text?: Nullable<string>;
}

export interface CreateIncidentInput {
    title: string;
    description: string;
    status?: Nullable<IncidentStatus>;
    severity?: Nullable<IncidentSeverity>;
    serviceId: string;
    assigneeId?: Nullable<string>;
    incidentDate: DateTime;
}

export interface UpdateIncidentInput {
    id: string;
    description?: Nullable<string>;
    status?: Nullable<IncidentStatus>;
    severity?: Nullable<IncidentSeverity>;
    assigneeId?: Nullable<string>;
    serviceId?: Nullable<string>;
    roomURL?: Nullable<string>;
}

export interface CreateOrganizationInput {
    name: string;
}

export interface UpdateOrganizationInput {
    id: string;
    name: string;
}

export interface CreateServiceGroupInput {
    name: string;
}

export interface UpdateServiceGroupInput {
    id: string;
    name: string;
}

export interface CreateServiceInput {
    name: string;
    description: string;
    link?: Nullable<string>;
    private: boolean;
    serviceGroupId?: Nullable<string>;
}

export interface UpdateServiceInput {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<ServiceStatus>;
    link?: Nullable<string>;
    private?: Nullable<boolean>;
    serviceGroupId?: Nullable<string>;
}

export interface CreateStatusMessageInput {
    text: string;
    incidentId: string;
    status: IncidentStatus;
}

export interface UpdateStatusMessageInput {
    id: string;
    text?: Nullable<string>;
    status?: Nullable<IncidentStatus>;
}

export interface CreateUserInput {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UpdateUserInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    role?: Nullable<Role>;
}

export interface ActionItem {
    id: string;
    text: string;
    owner: User;
    incident?: Nullable<Incident>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface IQuery {
    actionItems(): Nullable<ActionItem>[] | Promise<Nullable<ActionItem>[]>;
    actionItem(id: string): Nullable<ActionItem> | Promise<Nullable<ActionItem>>;
    actionItemsByUserID(userId: string): Nullable<Nullable<ActionItem>[]> | Promise<Nullable<Nullable<ActionItem>[]>>;
    actionItemsByIncidentID(incidentId: string): Nullable<Nullable<ActionItem>[]> | Promise<Nullable<Nullable<ActionItem>[]>>;
    eventsByIncidentId(incidentId: string): Nullable<Nullable<Event>[]> | Promise<Nullable<Nullable<Event>[]>>;
    incidents(): Nullable<Incident>[] | Promise<Nullable<Incident>[]>;
    incident(id: string): Nullable<Incident> | Promise<Nullable<Incident>>;
    incidentsByOrganizationId(orgId: string): Nullable<Incident>[] | Promise<Nullable<Incident>[]>;
    incidentRoomURL(id: string): Nullable<string> | Promise<Nullable<string>>;
    organizations(): Nullable<Organization>[] | Promise<Nullable<Organization>[]>;
    organization(id: string): Nullable<Organization> | Promise<Nullable<Organization>>;
    serviceGroups(): Nullable<ServiceGroup>[] | Promise<Nullable<ServiceGroup>[]>;
    serviceGroup(id: string): Nullable<ServiceGroup> | Promise<Nullable<ServiceGroup>>;
    services(): Nullable<Service>[] | Promise<Nullable<Service>[]>;
    service(id: string): Nullable<Service> | Promise<Nullable<Service>>;
    statusMessages(): Nullable<StatusMessage>[] | Promise<Nullable<StatusMessage>[]>;
    statusMessage(id: string): Nullable<StatusMessage> | Promise<Nullable<StatusMessage>>;
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createActionItem(createActionItemInput: CreateActionItemInput): ActionItem | Promise<ActionItem>;
    updateActionItem(updateActionItemInput: UpdateActionItemInput): ActionItem | Promise<ActionItem>;
    removeActionItem(id: string): Nullable<ActionItem> | Promise<Nullable<ActionItem>>;
    createEvent(createEventInput: CreateEventInput): Event | Promise<Event>;
    updateEvent(updateEventInput: UpdateEventInput): Event | Promise<Event>;
    removeEvent(id: string): Nullable<Event> | Promise<Nullable<Event>>;
    createIncident(createIncidentInput: CreateIncidentInput): Incident | Promise<Incident>;
    updateIncident(updateIncidentInput: UpdateIncidentInput): Incident | Promise<Incident>;
    removeIncident(id: string): Nullable<Incident> | Promise<Nullable<Incident>>;
    createOrganization(createOrganizationInput: CreateOrganizationInput): Organization | Promise<Organization>;
    updateOrganization(updateOrganizationInput: UpdateOrganizationInput): Organization | Promise<Organization>;
    removeOrganization(id: string): Nullable<Organization> | Promise<Nullable<Organization>>;
    createServiceGroup(createServiceGroupInput: CreateServiceGroupInput): ServiceGroup | Promise<ServiceGroup>;
    updateServiceGroup(updateServiceGroupInput: UpdateServiceGroupInput): ServiceGroup | Promise<ServiceGroup>;
    removeServiceGroup(id: string): Nullable<ServiceGroup> | Promise<Nullable<ServiceGroup>>;
    createService(createServiceInput: CreateServiceInput): Service | Promise<Service>;
    updateService(updateServiceInput: UpdateServiceInput): Service | Promise<Service>;
    removeService(id: string): Nullable<Service> | Promise<Nullable<Service>>;
    createStatusMessage(createStatusMessageInput: CreateStatusMessageInput): StatusMessage | Promise<StatusMessage>;
    updateStatusMessage(updateStatusMessageInput: UpdateStatusMessageInput): StatusMessage | Promise<StatusMessage>;
    removeStatusMessage(id: string): Nullable<StatusMessage> | Promise<Nullable<StatusMessage>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface Event {
    id: string;
    text?: Nullable<string>;
    incident?: Nullable<Incident>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Incident {
    id: string;
    title: string;
    description: string;
    assignee?: Nullable<User>;
    status?: Nullable<IncidentStatus>;
    service: Service;
    organization: Organization;
    events?: Nullable<Nullable<Event>[]>;
    statusMessage?: Nullable<Nullable<StatusMessage>[]>;
    actionItems?: Nullable<Nullable<ActionItem>[]>;
    severity: IncidentSeverity;
    roomURL?: Nullable<string>;
    incidentDate: DateTime;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Organization {
    id: string;
    name: string;
    incidents?: Nullable<Nullable<Incident>[]>;
    services?: Nullable<Nullable<Service>[]>;
    users?: Nullable<Nullable<User>[]>;
    serviceGroups?: Nullable<Nullable<ServiceGroup>[]>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface ServiceGroup {
    id: string;
    name?: Nullable<string>;
    services?: Nullable<Nullable<Service>[]>;
    organization?: Nullable<Organization>;
}

export interface Service {
    id: string;
    name: string;
    description?: Nullable<string>;
    status?: Nullable<ServiceStatus>;
    link?: Nullable<string>;
    private?: Nullable<boolean>;
    incidents?: Nullable<Nullable<Incident>[]>;
    organization?: Nullable<Organization>;
    serviceGroup?: Nullable<ServiceGroup>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface StatusMessage {
    id: string;
    text?: Nullable<string>;
    incident?: Nullable<Incident>;
    status?: Nullable<IncidentStatus>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    organization?: Nullable<Organization>;
    createdAt: DateTime;
    updatedAt: DateTime;
    actionItems?: Nullable<Nullable<ActionItem>[]>;
}

export type Time = any;
export type DateTime = any;
export type Timestamp = any;
export type UtcOffset = any;
export type Duration = any;
export type ISO8601Duration = any;
export type LocalDate = any;
export type LocalTime = any;
export type LocalEndTime = any;
export type EmailAddress = any;
export type NegativeFloat = any;
export type NegativeInt = any;
export type NonEmptyString = any;
export type NonNegativeFloat = any;
export type NonNegativeInt = any;
export type NonPositiveFloat = any;
export type NonPositiveInt = any;
export type PhoneNumber = any;
export type PositiveFloat = any;
export type PositiveInt = any;
export type PostalCode = any;
export type UnsignedFloat = any;
export type UnsignedInt = any;
export type URL = any;
export type BigInt = any;
export type Long = any;
export type Byte = any;
export type UUID = any;
export type GUID = any;
export type Hexadecimal = any;
export type HexColorCode = any;
export type HSL = any;
export type HSLA = any;
export type IPv4 = any;
export type IPv6 = any;
export type ISBN = any;
export type JWT = any;
export type Latitude = any;
export type Longitude = any;
export type MAC = any;
export type Port = any;
export type RGB = any;
export type RGBA = any;
export type SafeInt = any;
export type USCurrency = any;
export type Currency = any;
export type JSON = any;
export type JSONObject = any;
export type IBAN = any;
export type ObjectID = any;
export type Void = any;
export type DID = any;
type Nullable<T> = T | null;

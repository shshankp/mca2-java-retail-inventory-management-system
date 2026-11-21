package com.iwms.entity;

public enum Role {
    ADMIN,
    WAREHOUSE_MANAGER,
    CUSTOMER,
    // Legacy values retained only so existing database rows can still be read during migration.
    WAREHOUSE_STAFF,
    SALES_TEAM
}

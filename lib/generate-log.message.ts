import { ACTIONS, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) =>{
    const { action, entityTitle, entityType } = log;

    switch(action) {
        case ACTIONS.CREATE:
            return `Created ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTIONS.UPDATE:
            return `Updated ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTIONS.DELETE:
            return `Deleted ${entityType.toLowerCase()} "${entityTitle}"`;
        default:
            return `Unknown action ${entityType.toLowerCase()} "${entityTitle}"`;
    };
};

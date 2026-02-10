"use strict";
/**
 * @fileoverview Notification service module for email and messaging.
 *
 * @module services/notifications
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const send_email_1 = __importDefault(require("./send-email"));
exports.default = send_email_1.default;

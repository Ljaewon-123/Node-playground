"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.err = err;
function ok(data) {
    return { ok: true, data };
}
function err(error) {
    return { ok: false, error };
}

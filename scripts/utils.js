// utils.js
export const PREDICTION_VALUE_FOR_DETECT = 0.65;
export const PREDICTION_VALUE_FOR_ALERT = 0.75;

export function getUserMediaSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

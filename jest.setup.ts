import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
global.TransformStream = global.TransformStream || function () {};
global.BroadcastChannel = global.BroadcastChannel || function () {};

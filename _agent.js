(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const gettid = new NativeFunction(Module.getExportByName(null, 'gettid'), 'int', []);
const getpid = new NativeFunction(Module.getExportByName(null, 'getpid'), 'int', []);
const getuid = new NativeFunction(Module.getExportByName(null, 'getuid'), 'int', []);
let jni_struct_array = [
    "reserved0", "reserved1", "reserved2", "reserved3", "GetVersion", "DefineClass", "FindClass", "FromReflectedMethod", "FromReflectedField", "ToReflectedMethod", "GetSuperclass", "IsAssignableFrom", "ToReflectedField", "Throw", "ThrowNew",
    "ExceptionOccurred", "ExceptionDescribe", "ExceptionClear", "FatalError", "PushLocalFrame", "PopLocalFrame", "NewGlobalRef", "DeleteGlobalRef", "DeleteLocalRef", "IsSameObject", "NewLocalRef", "EnsureLocalCapacity", "AllocObject", "NewObject",
    "NewObjectV", "NewObjectA", "GetObjectClass", "IsInstanceOf", "GetMethodID", "CallObjectMethod", "CallObjectMethodV", "CallObjectMethodA", "CallBooleanMethod", "CallBooleanMethodV", "CallBooleanMethodA", "CallByteMethod", "CallByteMethodV",
    "CallByteMethodA", "CallCharMethod", "CallCharMethodV", "CallCharMethodA", "CallShortMethod", "CallShortMethodV", "CallShortMethodA", "CallIntMethod", "CallIntMethodV", "CallIntMethodA", "CallLongMethod", "CallLongMethodV", "CallLongMethodA",
    "CallFloatMethod", "CallFloatMethodV", "CallFloatMethodA", "CallDoubleMethod", "CallDoubleMethodV", "CallDoubleMethodA", "CallVoidMethod", "CallVoidMethodV", "CallVoidMethodA", "CallNonvirtualObjectMethod", "CallNonvirtualObjectMethodV",
    "CallNonvirtualObjectMethodA", "CallNonvirtualBooleanMethod", "CallNonvirtualBooleanMethodV", "CallNonvirtualBooleanMethodA", "CallNonvirtualByteMethod", "CallNonvirtualByteMethodV", "CallNonvirtualByteMethodA", "CallNonvirtualCharMethod",
    "CallNonvirtualCharMethodV", "CallNonvirtualCharMethodA", "CallNonvirtualShortMethod", "CallNonvirtualShortMethodV", "CallNonvirtualShortMethodA", "CallNonvirtualIntMethod", "CallNonvirtualIntMethodV", "CallNonvirtualIntMethodA",
    "CallNonvirtualLongMethod", "CallNonvirtualLongMethodV", "CallNonvirtualLongMethodA", "CallNonvirtualFloatMethod", "CallNonvirtualFloatMethodV", "CallNonvirtualFloatMethodA", "CallNonvirtualDoubleMethod", "CallNonvirtualDoubleMethodV",
    "CallNonvirtualDoubleMethodA", "CallNonvirtualVoidMethod", "CallNonvirtualVoidMethodV", "CallNonvirtualVoidMethodA", "GetFieldID", "GetObjectField", "GetBooleanField", "GetByteField", "GetCharField", "GetShortField", "GetIntField",
    "GetLongField", "GetFloatField", "GetDoubleField", "SetObjectField", "SetBooleanField", "SetByteField", "SetCharField", "SetShortField", "SetIntField", "SetLongField", "SetFloatField", "SetDoubleField", "GetStaticMethodID",
    "CallStaticObjectMethod", "CallStaticObjectMethodV", "CallStaticObjectMethodA", "CallStaticBooleanMethod", "CallStaticBooleanMethodV", "CallStaticBooleanMethodA", "CallStaticByteMethod", "CallStaticByteMethodV", "CallStaticByteMethodA",
    "CallStaticCharMethod", "CallStaticCharMethodV", "CallStaticCharMethodA", "CallStaticShortMethod", "CallStaticShortMethodV", "CallStaticShortMethodA", "CallStaticIntMethod", "CallStaticIntMethodV", "CallStaticIntMethodA", "CallStaticLongMethod",
    "CallStaticLongMethodV", "CallStaticLongMethodA", "CallStaticFloatMethod", "CallStaticFloatMethodV", "CallStaticFloatMethodA", "CallStaticDoubleMethod", "CallStaticDoubleMethodV", "CallStaticDoubleMethodA", "CallStaticVoidMethod",
    "CallStaticVoidMethodV", "CallStaticVoidMethodA", "GetStaticFieldID", "GetStaticObjectField", "GetStaticBooleanField", "GetStaticByteField", "GetStaticCharField", "GetStaticShortField", "GetStaticIntField", "GetStaticLongField",
    "GetStaticFloatField", "GetStaticDoubleField", "SetStaticObjectField", "SetStaticBooleanField", "SetStaticByteField", "SetStaticCharField", "SetStaticShortField", "SetStaticIntField", "SetStaticLongField", "SetStaticFloatField",
    "SetStaticDoubleField", "NewString", "GetStringLength", "GetStringChars", "ReleaseStringChars", "NewStringUTF", "GetStringUTFLength", "GetStringUTFChars", "ReleaseStringUTFChars", "GetArrayLength", "NewObjectArray", "GetObjectArrayElement",
    "SetObjectArrayElement", "NewBooleanArray", "NewByteArray", "NewCharArray", "NewShortArray", "NewIntArray", "NewLongArray", "NewFloatArray", "NewDoubleArray", "GetBooleanArrayElements", "GetByteArrayElements", "GetCharArrayElements",
    "GetShortArrayElements", "GetIntArrayElements", "GetLongArrayElements", "GetFloatArrayElements", "GetDoubleArrayElements", "ReleaseBooleanArrayElements", "ReleaseByteArrayElements", "ReleaseCharArrayElements", "ReleaseShortArrayElements",
    "ReleaseIntArrayElements", "ReleaseLongArrayElements", "ReleaseFloatArrayElements", "ReleaseDoubleArrayElements", "GetBooleanArrayRegion", "GetByteArrayRegion", "GetCharArrayRegion", "GetShortArrayRegion", "GetIntArrayRegion",
    "GetLongArrayRegion", "GetFloatArrayRegion", "GetDoubleArrayRegion", "SetBooleanArrayRegion", "SetByteArrayRegion", "SetCharArrayRegion", "SetShortArrayRegion", "SetIntArrayRegion", "SetLongArrayRegion", "SetFloatArrayRegion",
    "SetDoubleArrayRegion", "RegisterNatives", "UnregisterNatives", "MonitorEnter", "MonitorExit", "GetJavaVM", "GetStringRegion", "GetStringUTFRegion", "GetPrimitiveArrayCritical", "ReleasePrimitiveArrayCritical", "GetStringCritical",
    "ReleaseStringCritical", "NewWeakGlobalRef", "DeleteWeakGlobalRef", "ExceptionCheck", "NewDirectByteBuffer", "GetDirectBufferAddress", "GetDirectBufferCapacity", "GetObjectRefType"
];
function jhexdump(array) {
    if (!array)
        return;
    logger_1.log("---------jhexdump start---------");
    let ptr = Memory.alloc(array.length);
    for (let i = 0; i < array.length; ++i)
        ptr.add(i).writeS8(array[i]);
    logger_1.log(hexdump(ptr, { offset: 0, length: array.length, header: false, ansi: false }));
    logger_1.log("---------jhexdump end---------");
}
function jbhexdump(array) {
    logger_1.log("---------jbhexdump start---------");
    let JNIENv = Java.vm.getEnv();
    let size = JNIENv.getArrayLength(array);
    let data = JNIENv.getByteArrayElements(array);
    logger_1.log(hexdump(data, { offset: 0, length: 32, header: false, ansi: false }));
    JNIENv.releaseByteArrayElements(array, data, 0);
    logger_1.log("---------jbhexdump end---------");
}
function dumpByteArray(obj) {
    logger_1.log("---------dumpByteArray start---------");
    let obj_ptr = ptr(obj.$h).readPointer();
    let buf_ptr = obj_ptr.add(Process.pointerSize * 3);
    let size = obj_ptr.add(Process.pointerSize * 2).readU32();
    logger_1.log(hexdump(buf_ptr, { offset: 0, length: size, header: false, ansi: false }));
    logger_1.log("---------dumpByteArray end---------");
}
function getJAddr(func_name) {
    // 通过函数名获取到对应的jni函数地址
    let jnienv_addr = Java.vm.getEnv().handle.readPointer();
    let offset = jni_struct_array.indexOf(func_name) * Process.pointerSize;
    return jnienv_addr.add(offset).readPointer();
}
function CallXXXXMethodX(name, args) {
    let class_name = Java.vm.tryGetEnv().getObjectClassName(args[1]);
    if (jmethodIDs.has(`${args[2]}`)) {
        logger_1.log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name} ${jmethodIDs.get(`${args[2]}`)}`);
    }
}
function CallStaticXXXMethodX(name, args) {
    let class_name = Java.vm.tryGetEnv().getClassName(args[1]);
    if (jmethodIDs.has(`${args[2]}`)) {
        logger_1.log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name} ${jmethodIDs.get(`${args[2]}`)}`);
    }
}
function XXXStaticXXXField(name, args) {
    let class_name = Java.vm.tryGetEnv().getClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)) {
        logger_1.log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name} ${jfieldIDs.get(`${args[2]}`)}`);
    }
}
let jmethodIDs = new Map();
let jfieldIDs = new Map();
function hook_jni(func_name) {
    if (func_name.includes("reserved"))
        return;
    let listener = null;
    switch (func_name) {
        case "SetByteArrayRegion":
            listener = Interceptor.attach(getJAddr("SetByteArrayRegion"), {
                onEnter: function (args) {
                    let buf_len = args[3].toUInt32();
                    if (buf_len > 256) {
                        buf_len = 256;
                    }
                    let buffer_hex = hexdump(args[4], { offset: args[2].toUInt32(), length: buf_len, header: true, ansi: false });
                    logger_1.log(`/* TID ${gettid()} */ JNIENv->SetByteArrayRegion ${buffer_hex}`);
                }
            });
            break;
        case "GetFieldID":
            listener = Interceptor.attach(getJAddr("GetFieldID"), {
                onEnter(args) {
                    this.tid = gettid();
                    this.name = Java.vm.tryGetEnv().getClassName(args[1]);
                    this.sig = `${args[2].readUtf8String()} ${args[3].readUtf8String()}`;
                },
                onLeave(retval) {
                    jfieldIDs.set(`${retval}`, this.sig);
                    logger_1.log(`/* TID ${this.tid} */ JNIENv->GetFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                }
            });
            break;
        case "GetStaticFieldID":
            listener = Interceptor.attach(getJAddr("GetStaticFieldID"), {
                onEnter(args) {
                    this.tid = gettid();
                    this.name = Java.vm.tryGetEnv().getClassName(args[1]);
                    this.sig = `${args[2].readUtf8String()} ${args[3].readUtf8String()}`;
                },
                onLeave(retval) {
                    jfieldIDs.set(`${retval}`, this.sig);
                    logger_1.log(`/* TID ${this.tid} */ JNIENv->GetStaticFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                }
            });
            break;
        case "GetStaticObjectField":
            listener = Interceptor.attach(getJAddr("GetStaticObjectField"), { onEnter(args) { XXXStaticXXXField("GetStaticObjectField", args); } });
            break;
        case "GetStaticBooleanField":
            listener = Interceptor.attach(getJAddr("GetStaticBooleanField"), { onEnter(args) { XXXStaticXXXField("GetStaticBooleanField", args); } });
            break;
        case "GetStaticByteField":
            listener = Interceptor.attach(getJAddr("GetStaticByteField"), { onEnter(args) { XXXStaticXXXField("GetStaticByteField", args); } });
            break;
        case "GetStaticCharField":
            listener = Interceptor.attach(getJAddr("GetStaticCharField"), { onEnter(args) { XXXStaticXXXField("GetStaticCharField", args); } });
            break;
        case "GetStaticShortField":
            listener = Interceptor.attach(getJAddr("GetStaticShortField"), { onEnter(args) { XXXStaticXXXField("GetStaticShortField", args); } });
            break;
        case "GetStaticIntField":
            listener = Interceptor.attach(getJAddr("GetStaticIntField"), { onEnter(args) { XXXStaticXXXField("GetStaticIntField", args); } });
            break;
        case "GetStaticLongField":
            listener = Interceptor.attach(getJAddr("GetStaticLongField"), { onEnter(args) { XXXStaticXXXField("GetStaticLongField", args); } });
            break;
        case "GetStaticFloatField":
            listener = Interceptor.attach(getJAddr("GetStaticFloatField"), { onEnter(args) { XXXStaticXXXField("GetStaticFloatField", args); } });
            break;
        case "GetStaticDoubleField":
            listener = Interceptor.attach(getJAddr("GetStaticDoubleField"), { onEnter(args) { XXXStaticXXXField("GetStaticDoubleField", args); } });
            break;
        case "SetStaticObjectField":
            listener = Interceptor.attach(getJAddr("SetStaticObjectField"), { onEnter(args) { XXXStaticXXXField("SetStaticObjectField", args); } });
            break;
        case "SetStaticBooleanField":
            listener = Interceptor.attach(getJAddr("SetStaticBooleanField"), { onEnter(args) { XXXStaticXXXField("SetStaticBooleanField", args); } });
            break;
        case "SetStaticByteField":
            listener = Interceptor.attach(getJAddr("SetStaticByteField"), { onEnter(args) { XXXStaticXXXField("SetStaticByteField", args); } });
            break;
        case "SetStaticCharField":
            listener = Interceptor.attach(getJAddr("SetStaticCharField"), { onEnter(args) { XXXStaticXXXField("SetStaticCharField", args); } });
            break;
        case "SetStaticShortField":
            listener = Interceptor.attach(getJAddr("SetStaticShortField"), { onEnter(args) { XXXStaticXXXField("SetStaticShortField", args); } });
            break;
        case "SetStaticIntField":
            listener = Interceptor.attach(getJAddr("SetStaticIntField"), { onEnter(args) { XXXStaticXXXField("SetStaticIntField", args); } });
            break;
        case "SetStaticLongField":
            listener = Interceptor.attach(getJAddr("SetStaticLongField"), { onEnter(args) { XXXStaticXXXField("SetStaticLongField", args); } });
            break;
        case "SetStaticFloatField":
            listener = Interceptor.attach(getJAddr("SetStaticFloatField"), { onEnter(args) { XXXStaticXXXField("SetStaticFloatField", args); } });
            break;
        case "SetStaticDoubleField":
            listener = Interceptor.attach(getJAddr("SetStaticDoubleField"), { onEnter(args) { XXXStaticXXXField("SetStaticDoubleField", args); } });
            break;
        case "NewStringUTF":
            listener = Interceptor.attach(getJAddr("NewStringUTF"), {
                onEnter: function (args) {
                    logger_1.log(`/* TID ${gettid()} */ JNIENv->NewStringUTF ${args[1].readUtf8String()}`);
                }
            });
            break;
        case "GetStringUTFChars":
            listener = Interceptor.attach(getJAddr("GetStringUTFChars"), {
                onLeave: function (retval) {
                    let msg;
                    try {
                        msg = retval.readUtf8String();
                    }
                    catch (e) { }
                    if (msg) {
                        logger_1.log(`/* TID ${gettid()} */ JNIENv->GetStringUTFChars ${msg}`);
                    }
                }
            });
            break;
        case "FindClass":
            listener = Interceptor.attach(getJAddr("FindClass"), {
                onEnter: function (args) {
                    logger_1.log(`/* TID ${gettid()} */ JNIENv->FindClass ${args[1].readUtf8String()}`);
                }
            });
            break;
        case "GetMethodID":
            listener = Interceptor.attach(getJAddr("GetMethodID"), {
                onEnter(args) {
                    this.tid = gettid();
                    this.name = Java.vm.tryGetEnv().getClassName(args[1]);
                    this.sig = `${args[2].readUtf8String()}${args[3].readUtf8String()}`;
                },
                onLeave(retval) {
                    jmethodIDs.set(`${retval}`, this.sig);
                    logger_1.log(`/* TID ${this.tid} */ JNIENv->GetMethodID ${this.name} ${this.sig} jmethodID ${retval}`);
                }
            });
            break;
        case "CallObjectMethod":
            listener = Interceptor.attach(getJAddr("CallObjectMethod"), { onEnter(args) { CallXXXXMethodX("CallObjectMethod", args); } });
            break;
        case "CallObjectMethodV":
            listener = Interceptor.attach(getJAddr("CallObjectMethodV"), { onEnter(args) { CallXXXXMethodX("CallObjectMethodV", args); } });
            break;
        case "CallObjectMethodA":
            listener = Interceptor.attach(getJAddr("CallObjectMethodA"), { onEnter(args) { CallXXXXMethodX("CallObjectMethodA", args); } });
            break;
        case "CallBooleanMethod":
            listener = Interceptor.attach(getJAddr("CallBooleanMethod"), { onEnter(args) { CallXXXXMethodX("CallBooleanMethod", args); } });
            break;
        case "CallBooleanMethodV":
            listener = Interceptor.attach(getJAddr("CallBooleanMethodV"), { onEnter(args) { CallXXXXMethodX("CallBooleanMethodV", args); } });
            break;
        case "CallBooleanMethodA":
            listener = Interceptor.attach(getJAddr("CallBooleanMethodA"), { onEnter(args) { CallXXXXMethodX("CallBooleanMethodA", args); } });
            break;
        case "CallByteMethod":
            listener = Interceptor.attach(getJAddr("CallByteMethod"), { onEnter(args) { CallXXXXMethodX("CallByteMethod", args); } });
            break;
        case "CallByteMethodV":
            listener = Interceptor.attach(getJAddr("CallByteMethodV"), { onEnter(args) { CallXXXXMethodX("CallByteMethodV", args); } });
            break;
        case "CallByteMethodA":
            listener = Interceptor.attach(getJAddr("CallByteMethodA"), { onEnter(args) { CallXXXXMethodX("CallByteMethodA", args); } });
            break;
        case "CallCharMethod":
            listener = Interceptor.attach(getJAddr("CallCharMethod"), { onEnter(args) { CallXXXXMethodX("CallCharMethod", args); } });
            break;
        case "CallCharMethodV":
            listener = Interceptor.attach(getJAddr("CallCharMethodV"), { onEnter(args) { CallXXXXMethodX("CallCharMethodV", args); } });
            break;
        case "CallCharMethodA":
            listener = Interceptor.attach(getJAddr("CallCharMethodA"), { onEnter(args) { CallXXXXMethodX("CallCharMethodA", args); } });
            break;
        case "CallShortMethod":
            listener = Interceptor.attach(getJAddr("CallShortMethod"), { onEnter(args) { CallXXXXMethodX("CallShortMethod", args); } });
            break;
        case "CallShortMethodV":
            listener = Interceptor.attach(getJAddr("CallShortMethodV"), { onEnter(args) { CallXXXXMethodX("CallShortMethodV", args); } });
            break;
        case "CallShortMethodA":
            listener = Interceptor.attach(getJAddr("CallShortMethodA"), { onEnter(args) { CallXXXXMethodX("CallShortMethodA", args); } });
            break;
        case "CallIntMethod":
            listener = Interceptor.attach(getJAddr("CallIntMethod"), { onEnter(args) { CallXXXXMethodX("CallIntMethod", args); } });
            break;
        case "CallIntMethodV":
            listener = Interceptor.attach(getJAddr("CallIntMethodV"), { onEnter(args) { CallXXXXMethodX("CallIntMethodV", args); } });
            break;
        case "CallIntMethodA":
            listener = Interceptor.attach(getJAddr("CallIntMethodA"), { onEnter(args) { CallXXXXMethodX("CallIntMethodA", args); } });
            break;
        case "CallLongMethod":
            listener = Interceptor.attach(getJAddr("CallLongMethod"), { onEnter(args) { CallXXXXMethodX("CallLongMethod", args); } });
            break;
        case "CallLongMethodV":
            listener = Interceptor.attach(getJAddr("CallLongMethodV"), { onEnter(args) { CallXXXXMethodX("CallLongMethodV", args); } });
            break;
        case "CallLongMethodA":
            listener = Interceptor.attach(getJAddr("CallLongMethodA"), { onEnter(args) { CallXXXXMethodX("CallLongMethodA", args); } });
            break;
        case "CallFloatMethod":
            listener = Interceptor.attach(getJAddr("CallFloatMethod"), { onEnter(args) { CallXXXXMethodX("CallFloatMethod", args); } });
            break;
        case "CallFloatMethodV":
            listener = Interceptor.attach(getJAddr("CallFloatMethodV"), { onEnter(args) { CallXXXXMethodX("CallFloatMethodV", args); } });
            break;
        case "CallFloatMethodA":
            listener = Interceptor.attach(getJAddr("CallFloatMethodA"), { onEnter(args) { CallXXXXMethodX("CallFloatMethodA", args); } });
            break;
        case "CallDoubleMethod":
            listener = Interceptor.attach(getJAddr("CallDoubleMethod"), { onEnter(args) { CallXXXXMethodX("CallDoubleMethod", args); } });
            break;
        case "CallDoubleMethodV":
            listener = Interceptor.attach(getJAddr("CallDoubleMethodV"), { onEnter(args) { CallXXXXMethodX("CallDoubleMethodV", args); } });
            break;
        case "CallDoubleMethodA":
            listener = Interceptor.attach(getJAddr("CallDoubleMethodA"), { onEnter(args) { CallXXXXMethodX("CallDoubleMethodA", args); } });
            break;
        case "CallVoidMethod":
            listener = Interceptor.attach(getJAddr("CallVoidMethod"), { onEnter(args) { CallXXXXMethodX("CallVoidMethod", args); } });
            break;
        case "CallVoidMethodV":
            listener = Interceptor.attach(getJAddr("CallVoidMethodV"), { onEnter(args) { CallXXXXMethodX("CallVoidMethodV", args); } });
            break;
        case "CallVoidMethodA":
            listener = Interceptor.attach(getJAddr("CallVoidMethodA"), { onEnter(args) { CallXXXXMethodX("CallVoidMethodA", args); } });
            break;
        case "CallNonvirtualObjectMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualObjectMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualObjectMethod", args); } });
            break;
        case "CallNonvirtualObjectMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualObjectMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualObjectMethodV", args); } });
            break;
        case "CallNonvirtualObjectMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualObjectMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualObjectMethodA", args); } });
            break;
        case "CallNonvirtualBooleanMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualBooleanMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualBooleanMethod", args); } });
            break;
        case "CallNonvirtualBooleanMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualBooleanMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualBooleanMethodV", args); } });
            break;
        case "CallNonvirtualBooleanMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualBooleanMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualBooleanMethodA", args); } });
            break;
        case "CallNonvirtualByteMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualByteMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualByteMethod", args); } });
            break;
        case "CallNonvirtualByteMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualByteMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualByteMethodV", args); } });
            break;
        case "CallNonvirtualByteMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualByteMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualByteMethodA", args); } });
            break;
        case "CallNonvirtualCharMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualCharMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualCharMethod", args); } });
            break;
        case "CallNonvirtualCharMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualCharMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualCharMethodV", args); } });
            break;
        case "CallNonvirtualCharMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualCharMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualCharMethodA", args); } });
            break;
        case "CallNonvirtualShortMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualShortMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualShortMethod", args); } });
            break;
        case "CallNonvirtualShortMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualShortMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualShortMethodV", args); } });
            break;
        case "CallNonvirtualShortMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualShortMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualShortMethodA", args); } });
            break;
        case "CallNonvirtualIntMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualIntMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualIntMethod", args); } });
            break;
        case "CallNonvirtualIntMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualIntMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualIntMethodV", args); } });
            break;
        case "CallNonvirtualIntMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualIntMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualIntMethodA", args); } });
            break;
        case "CallNonvirtualLongMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualLongMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualLongMethod", args); } });
            break;
        case "CallNonvirtualLongMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualLongMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualLongMethodV", args); } });
            break;
        case "CallNonvirtualLongMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualLongMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualLongMethodA", args); } });
            break;
        case "CallNonvirtualFloatMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualFloatMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualFloatMethod", args); } });
            break;
        case "CallNonvirtualFloatMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualFloatMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualFloatMethodV", args); } });
            break;
        case "CallNonvirtualFloatMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualFloatMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualFloatMethodA", args); } });
            break;
        case "CallNonvirtualDoubleMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualDoubleMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualDoubleMethod", args); } });
            break;
        case "CallNonvirtualDoubleMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualDoubleMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualDoubleMethodV", args); } });
            break;
        case "CallNonvirtualDoubleMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualDoubleMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualDoubleMethodA", args); } });
            break;
        case "CallNonvirtualVoidMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualVoidMethod"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualVoidMethod", args); } });
            break;
        case "CallNonvirtualVoidMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualVoidMethodV"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualVoidMethodV", args); } });
            break;
        case "CallNonvirtualVoidMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualVoidMethodA"), { onEnter(args) { CallXXXXMethodX("CallNonvirtualVoidMethodA", args); } });
            break;
        case "GetStaticMethodID":
            listener = Interceptor.attach(getJAddr("GetStaticMethodID"), {
                onEnter(args) {
                    this.tid = gettid();
                    this.name = Java.vm.tryGetEnv().getClassName(args[1]);
                    this.sig = `${args[2].readUtf8String()}${args[3].readUtf8String()}`;
                },
                onLeave(retval) {
                    jmethodIDs.set(`${retval}`, this.sig);
                    logger_1.log(`/* TID ${this.tid} */ JNIENv->GetStaticMethodID ${this.name} ${this.sig} jmethodID ${retval}`);
                }
            });
            break;
        case "CallStaticObjectMethod":
            listener = Interceptor.attach(getJAddr("CallStaticObjectMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticObjectMethod", args); } });
            break;
        case "CallStaticObjectMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticObjectMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticObjectMethodV", args); } });
            break;
        case "CallStaticObjectMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticObjectMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticObjectMethodA", args); } });
            break;
        case "CallStaticBooleanMethod":
            listener = Interceptor.attach(getJAddr("CallStaticBooleanMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticBooleanMethod", args); } });
            break;
        case "CallStaticBooleanMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticBooleanMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticBooleanMethodV", args); } });
            break;
        case "CallStaticBooleanMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticBooleanMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticBooleanMethodA", args); } });
            break;
        case "CallStaticByteMethod":
            listener = Interceptor.attach(getJAddr("CallStaticByteMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticByteMethod", args); } });
            break;
        case "CallStaticByteMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticByteMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticByteMethodV", args); } });
            break;
        case "CallStaticByteMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticByteMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticByteMethodA", args); } });
            break;
        case "CallStaticCharMethod":
            listener = Interceptor.attach(getJAddr("CallStaticCharMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticCharMethod", args); } });
            break;
        case "CallStaticCharMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticCharMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticCharMethodV", args); } });
            break;
        case "CallStaticCharMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticCharMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticCharMethodA", args); } });
            break;
        case "CallStaticShortMethod":
            listener = Interceptor.attach(getJAddr("CallStaticShortMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticShortMethod", args); } });
            break;
        case "CallStaticShortMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticShortMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticShortMethodV", args); } });
            break;
        case "CallStaticShortMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticShortMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticShortMethodA", args); } });
            break;
        case "CallStaticIntMethod":
            listener = Interceptor.attach(getJAddr("CallStaticIntMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticIntMethod", args); } });
            break;
        case "CallStaticIntMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticIntMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticIntMethodV", args); } });
            break;
        case "CallStaticIntMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticIntMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticIntMethodA", args); } });
            break;
        case "CallStaticLongMethod":
            listener = Interceptor.attach(getJAddr("CallStaticLongMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticLongMethod", args); } });
            break;
        case "CallStaticLongMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticLongMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticLongMethodV", args); } });
            break;
        case "CallStaticLongMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticLongMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticLongMethodA", args); } });
            break;
        case "CallStaticFloatMethod":
            listener = Interceptor.attach(getJAddr("CallStaticFloatMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticFloatMethod", args); } });
            break;
        case "CallStaticFloatMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticFloatMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticFloatMethodV", args); } });
            break;
        case "CallStaticFloatMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticFloatMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticFloatMethodA", args); } });
            break;
        case "CallStaticDoubleMethod":
            listener = Interceptor.attach(getJAddr("CallStaticDoubleMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticDoubleMethod", args); } });
            break;
        case "CallStaticDoubleMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticDoubleMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticDoubleMethodV", args); } });
            break;
        case "CallStaticDoubleMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticDoubleMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticDoubleMethodA", args); } });
            break;
        case "CallStaticVoidMethod":
            listener = Interceptor.attach(getJAddr("CallStaticVoidMethod"), { onEnter(args) { CallStaticXXXMethodX("CallStaticVoidMethod", args); } });
            break;
        case "CallStaticVoidMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticVoidMethodV"), { onEnter(args) { CallStaticXXXMethodX("CallStaticVoidMethodV", args); } });
            break;
        case "CallStaticVoidMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticVoidMethodA"), { onEnter(args) { CallStaticXXXMethodX("CallStaticVoidMethodA", args); } });
            break;
        default:
        // log(`skip JNIENv->${func_name}`);
        // listener = Interceptor.attach(getJAddr(func_name), {
        //     onEnter: function(args){
        //         log(`JNIENv->${func_name} was called`);
        //         // log(`JNIENv->${func_name} was called from ${Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n")}`);
        //     }
        // })
    }
    return listener;
}
function hook_all_jni() {
    for (let index in jni_struct_array) {
        // log(jni_struct_array[index])
        hook_jni(jni_struct_array[index]);
    }
}
hook_all_jni();
// hook_jni("GetStringUTFChars");
// hook_jni("SetByteArrayRegion");
// hook_jni("GetFieldID");
// hook_jni("GetStaticFieldID");
// hook_jni("GetStaticObjectField");
// hook_jni("GetMethodID");
// hook_jni("CallObjectMethod");
// hook_jni("GetStaticMethodID");

},{"./logger":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
function log(message) {
    console.log(message);
}
exports.log = log;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZ2VudC9pbmRleC50cyIsImFnZW50L2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEscUNBQStCO0FBRS9CLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNyRixNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckYsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRXJGLElBQUksZ0JBQWdCLEdBQUc7SUFDbkIsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsVUFBVTtJQUM1TyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxXQUFXO0lBQ2xQLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIs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QUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQy9JLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3pJLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3pJLEtBQUsscUJBQXFCO1lBQ3RCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQzNJLEtBQUssbUJBQW1CO1lBQ3BCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3ZJLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3pJLEtBQUsscUJBQXFCO1lBQ3RCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQzNJLEtBQUssc0JBQXNCO1lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQzdJLEtBQUssc0JBQXNCO1lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQzdJLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQy9JLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3pJLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3pJLEtBQUsscUJBQXFCO1lBQ3RCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQzNJLEtBQUssbUJBQW1CO1lBQ3BCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3ZJLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3pJLEtB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Q0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssc0JBQXNCO1lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2hKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssd0JBQXdCO1lBQ3pCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3BKLEtBQUssd0JBQXdCO1lBQ3pCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3BKLEtBQUsscUJBQXFCO1lBQ3RCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQzlJLEtBQUssc0JBQXNCO1lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2hKLEtBQUssc0JBQXNCO1lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2hKLEtBQUssc0JBQXNCO1lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2hKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssd0JBQXdCO1lBQ3pCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3BKLEtBQUssd0JBQXdCO1lBQ3pCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3BKLEtBQUssd0JBQXdCO1lBQ3pCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3BKLEtBQUsseUJBQXlCO1lBQzFCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3RKLEtBQUsseUJBQXlCO1lBQzFCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3RKLEtBQUssc0JBQXNCO1lBQ3ZCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2hKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLEtBQUssdUJBQXVCO1lBQ3hCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxvQkFBb0IsQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ2xKLFFBQVE7UUFDSixvQ0FBb0M7UUFDcEMsdURBQXVEO1FBQ3ZELCtCQUErQjtRQUMvQixrREFBa0Q7UUFDbEQseUpBQXlKO1FBQ3pKLFFBQVE7UUFDUixLQUFLO0tBQ1o7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBUyxZQUFZO0lBQ2pCLEtBQUssSUFBSSxLQUFLLElBQUksZ0JBQWdCLEVBQUM7UUFDL0IsK0JBQStCO1FBQy9CLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0FBQ0wsQ0FBQztBQUVELFlBQVksRUFBRSxDQUFDO0FBQ2YsaUNBQWlDO0FBQ2pDLGtDQUFrQztBQUNsQywwQkFBMEI7QUFDMUIsZ0NBQWdDO0FBQ2hDLG9DQUFvQztBQUNwQywyQkFBMkI7QUFDM0IsZ0NBQWdDO0FBQ2hDLGlDQUFpQzs7Ozs7O0FDM2FqQyxTQUFnQixHQUFHLENBQUMsT0FBWTtJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFGRCxrQkFFQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIn0=

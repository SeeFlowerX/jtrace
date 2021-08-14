(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const unidbg_1 = require("./templates/unidbg");
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
        logger_1.log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name.replaceAll(".", "/")}->${jmethodIDs.get(`${args[2]}`)}`);
    }
}
function CallXXXXMethodXRET(name, args) {
    let class_name = Java.vm.tryGetEnv().getObjectClassName(args[1]);
    if (jmethodIDs.has(`${args[2]}`)) {
        return `/* TID ${gettid()} */ JNIENv->${name} ${class_name.replaceAll(".", "/")}->${jmethodIDs.get(`${args[2]}`)}`;
    }
    return `/* TID ${gettid()} */ JNIENv->${name} ${class_name.replaceAll(".", "/")}->${args[2]}`;
}
function CallStaticXXXMethodX(name, args) {
    let class_name = Java.vm.tryGetEnv().getClassName(args[1]);
    if (jmethodIDs.has(`${args[2]}`)) {
        logger_1.log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name.replaceAll(".", "/")}->${jmethodIDs.get(`${args[2]}`)}`);
    }
}
function XXXStaticXXXField(name, args) {
    let class_name = Java.vm.tryGetEnv().getClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)) {
        logger_1.log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name} ${jfieldIDs.get(`${args[2]}`)}`);
    }
}
function XXXStaticXXXFieldRET(name, args) {
    let base_msg = `/* TID ${gettid()} */ JNIENv->${name}`;
    let class_name = Java.vm.tryGetEnv().getClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)) {
        return [base_msg, `${class_name.replaceAll(".", "/")}->${jfieldIDs.get(`${args[2]}`)}`];
    }
    return [base_msg, `${class_name.replaceAll(".", "/")}->${args[2]}`];
}
function XXXFieldRET(name, args) {
    // return `${Java.vm.tryGetEnv().getClassName(args[1])}`;
    let base_msg = `/* TID ${gettid()} */ JNIENv->${name}`;
    let class_name = Java.vm.tryGetEnv().getObjectClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)) {
        return [base_msg, `${class_name.replaceAll(".", "/")}->${jfieldIDs.get(`${args[2]}`)}`];
    }
    return [base_msg, `${class_name.replaceAll(".", "/")}->${args[2]}`];
}
function init_jfieldID_by_cls_name(cls_name) {
    Java.perform(function () {
        let DeflaterCls = Java.use(cls_name);
        let fields = DeflaterCls.class.getDeclaredFields();
        for (let i = 0; i < fields.length; i++) {
            try {
                let cls_field = fields[i];
                cls_field.setAccessible(true);
                let name = cls_field.getName();
                // console.log("**--*", cls_field, name)
                if (name == "$assertionsDisabled")
                    continue;
                let sig_name = cls_field.getType().getName();
                if (name2sig.has(sig_name)) {
                    let sig = name2sig.get(sig_name);
                    let clazz = Java.vm.tryGetEnv().findClass(cls_name.replaceAll(".", "/"));
                    let jfieldID = Java.vm.tryGetEnv().getFieldId(clazz, name, sig);
                    jfieldIDs.set(`${jfieldID}`, `${name}:${sig}`);
                    console.log("***", cls_field, name, clazz, jfieldID);
                    // 调用了getFieldId 这里不用设置 jfieldIDs
                }
            }
            catch (e) {
            }
        }
    });
}
function bytes2hex(array) {
    let result = '';
    for (let i = 0; i < array.length; ++i)
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    return result;
}
function md5Digest_bytes(input) {
    let digest = Java.use("java.security.MessageDigest").getInstance("md5");
    digest.update(input);
    return bytes2hex(digest.digest());
}
function md5Digest_string(input) {
    let digest = Java.use("java.security.MessageDigest").getInstance("md5");
    let charset = Java.use("java.nio.charset.StandardCharsets").UTF_8.value;
    digest.update(input.getBytes(charset));
    return bytes2hex(digest.digest());
}
function LogSignatureMetadata(obj) {
    let cf = Java.use("java.security.cert.CertificateFactory").getInstance("X.509");
    let is = Java.use("java.io.ByteArrayInputStream").$new(obj.toByteArray());
    let cert = Java.cast(cf.generateCertificate(is), Java.use("java.security.cert.X509Certificate"));
    let buf = cert.getEncoded();
    let sighex = bytes2hex(buf);
    let publicKeyString = Java.use("java.lang.String").$new(sighex.toUpperCase());
    unidbg_1.CertificateMeta(cert.getSigAlgName().toUpperCase(), cert.getSigAlgOID(), cert.getNotBefore().getTime(), cert.getNotAfter().getTime(), sighex, md5Digest_bytes(buf), md5Digest_string(publicKeyString));
}
let jmethodIDs = new Map();
let jfieldIDs = new Map();
let name2sig = new Map();
name2sig.set("boolean", "Z");
name2sig.set("byte", "B");
name2sig.set("char", "C");
name2sig.set("short", "S");
name2sig.set("int", "I");
name2sig.set("long", "J");
name2sig.set("float", "F");
name2sig.set("double", "D");
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
                    let buffer_hex = hexdump(args[4].add(args[2].toUInt32()), { offset: 0, length: buf_len, header: true, ansi: false });
                    logger_1.log(`/* TID ${gettid()} */ JNIENv->SetByteArrayRegion ${buffer_hex}`);
                }
            });
            break;
        case "GetFieldID":
            listener = Interceptor.attach(getJAddr("GetFieldID"), {
                onEnter(args) {
                    this.tid = gettid();
                    this.name = Java.vm.tryGetEnv().getClassName(args[1]);
                    this.sig = `${args[2].readUtf8String()}:${args[3].readUtf8String()}`;
                },
                onLeave(retval) {
                    jfieldIDs.set(`${retval}`, this.sig);
                    // log(`/* TID ${this.tid} */ JNIENv->GetFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                    // if(show_cache_log) log(`/* TID ${this.tid} */ JNIENv->GetFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                }
            });
            break;
        case "GetObjectField":
            listener = Interceptor.attach(getJAddr("GetObjectField"), {
                onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetObjectField", args); },
                onLeave(retval) {
                    let switch_flag = true;
                    // console.log("this.signaturethis.signature", this.signature)
                    switch (this.signature) {
                        case "android/content/pm/PackageInfo->signatures:[Landroid/content/pm/Signature;":
                            let length = Java.vm.tryGetEnv().getArrayLength(retval);
                            for (let i = 0; i < length; i++) {
                                let jobj = Java.vm.tryGetEnv().getObjectArrayElement(retval, i);
                                let obj = Java.cast(jobj, Java.use("android.content.pm.Signature"));
                                LogSignatureMetadata(obj);
                            }
                            break;
                        default:
                            switch_flag = false;
                    }
                    if (!switch_flag && this.signature.endsWith(":Ljava/lang/String;")) {
                        let field_msg = Java.vm.tryGetEnv().getStringUtfChars(retval).readUtf8String();
                        unidbg_1.LogStringReturn("GetObjectField", this.signature, field_msg);
                    }
                    else if (!switch_flag && this.signature.endsWith(":Ljava/lang/Class;")) {
                        let field_msg = Java.vm.tryGetEnv().getClassName(retval);
                        unidbg_1.LogClassReturn("GetObjectField", this.signature, field_msg);
                    }
                    // log(`${this.base_msg} ${this.signature} ${retval}`)
                }
            });
            break;
        case "GetBooleanField":
            listener = Interceptor.attach(getJAddr("GetBooleanField"), { onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetBooleanField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${Boolean(retval.toUInt32())}`); } });
            break;
        case "GetByteField":
            listener = Interceptor.attach(getJAddr("GetByteField"), { onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetByteField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval}`); } });
            break;
        case "GetCharField":
            listener = Interceptor.attach(getJAddr("GetCharField"), { onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetCharField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval}`); } });
            break;
        case "GetShortField":
            listener = Interceptor.attach(getJAddr("GetShortField"), { onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetShortField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}`); } });
            break;
        case "GetIntField":
            listener = Interceptor.attach(getJAddr("GetIntField"), { onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetIntField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}`); } });
            break;
        case "GetLongField":
            listener = Interceptor.attach(getJAddr("GetLongField"), { onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetLongField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}L`); } });
            break;
        case "GetFloatField":
            listener = Interceptor.attach(getJAddr("GetFloatField"), { onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetFloatField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval}`); } });
            break;
        case "GetDoubleField":
            listener = Interceptor.attach(getJAddr("GetDoubleField"), { onEnter(args) { [this.base_msg, this.signature] = XXXFieldRET("GetDoubleField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval}`); } });
            break;
        case "SetObjectField":
            listener = Interceptor.attach(getJAddr("SetObjectField"), {
                onEnter(args) {
                    [this.base_msg, this.signature] = XXXFieldRET("SetObjectField", args);
                    let val = args[3];
                    if (this.signature.endsWith(":Ljava/lang/String;")) {
                        val = Java.vm.tryGetEnv().getStringUtfChars(val).readUtf8String();
                    }
                    else if (this.signature.endsWith(":Ljava/lang/Class;")) {
                        val = Java.vm.tryGetEnv().getClassName(val);
                    }
                    logger_1.log(`${this.base_msg} ${this.signature} ${val}`);
                }
            });
            break;
        case "SetBooleanField":
            listener = Interceptor.attach(getJAddr("SetBooleanField"), { onEnter(args) { logger_1.log(`${XXXFieldRET("SetBooleanField", args)} ${Boolean(args[3].toUInt32())}`); } });
            break;
        case "SetByteField":
            listener = Interceptor.attach(getJAddr("SetByteField"), { onEnter(args) { logger_1.log(`${XXXFieldRET("SetByteField", args)} ${args[3]}`); } });
            break;
        case "SetCharField":
            listener = Interceptor.attach(getJAddr("SetCharField"), { onEnter(args) { logger_1.log(`${XXXFieldRET("SetCharField", args)} ${args[3]}`); } });
            break;
        case "SetShortField":
            listener = Interceptor.attach(getJAddr("SetShortField"), { onEnter(args) { logger_1.log(`${XXXFieldRET("SetShortField", args)} ${args[3].toUInt32()}`); } });
            break;
        case "SetIntField":
            listener = Interceptor.attach(getJAddr("SetIntField"), { onEnter(args) { logger_1.log(`${XXXFieldRET("SetIntField", args)} ${args[3].toUInt32()}`); } });
            break;
        case "SetLongField":
            listener = Interceptor.attach(getJAddr("SetLongField"), { onEnter(args) { logger_1.log(`${XXXFieldRET("SetLongField", args)} ${args[3].toUInt32()}L`); } });
            break;
        case "SetFloatField":
            listener = Interceptor.attach(getJAddr("SetFloatField"), { onEnter(args) { logger_1.log(`${XXXFieldRET("SetFloatField", args)} ${args[3]}`); } });
            break;
        case "SetDoubleField":
            listener = Interceptor.attach(getJAddr("SetDoubleField"), { onEnter(args) { logger_1.log(`${XXXFieldRET("SetDoubleField", args)} ${args[3]}`); } });
            break;
        case "GetStaticFieldID":
            listener = Interceptor.attach(getJAddr("GetStaticFieldID"), {
                onEnter(args) {
                    this.tid = gettid();
                    this.name = Java.vm.tryGetEnv().getClassName(args[1]);
                    this.sig = `${args[2].readUtf8String()}:${args[3].readUtf8String()}`;
                },
                onLeave(retval) {
                    jfieldIDs.set(`${retval}`, this.sig);
                    if (show_cache_log)
                        logger_1.log(`/* TID ${this.tid} */ JNIENv->GetStaticFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                }
            });
            break;
        case "GetStaticObjectField":
            listener = Interceptor.attach(getJAddr("GetStaticObjectField"), {
                onEnter(args) { [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticObjectField", args); },
                onLeave(retval) {
                    if (this.signature.endsWith(":Ljava/lang/String;")) {
                        let field_msg = Java.vm.tryGetEnv().getStringUtfChars(retval).readUtf8String();
                        unidbg_1.LogStringReturn("GetStaticObjectField", this.signature, field_msg);
                    }
                    else if (this.signature.endsWith(":Ljava/lang/Class;")) {
                        let field_msg = Java.vm.tryGetEnv().getClassName(retval);
                        unidbg_1.LogClassReturn("GetStaticObjectField", this.signature, field_msg);
                    }
                    else if (this.signature.endsWith(":I")) {
                        unidbg_1.LogNumReturn("GetStaticObjectField", this.signature, retval.toUInt32());
                    }
                    else if (this.signature.endsWith(":J")) {
                        unidbg_1.LogLongReturn("GetStaticObjectField", this.signature, retval.toUInt32());
                    }
                    else {
                        logger_1.log(`${this.signature} ${retval}`);
                    }
                }
            });
            break;
        case "GetStaticBooleanField":
            listener = Interceptor.attach(getJAddr("GetStaticBooleanField"), { onEnter(args) { [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticBooleanField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${Boolean(retval.toUInt32())}`); } });
            break;
        case "GetStaticByteField":
            listener = Interceptor.attach(getJAddr("GetStaticByteField"), { onEnter(args) { [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticByteField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval}`); } });
            break;
        case "GetStaticCharField":
            listener = Interceptor.attach(getJAddr("GetStaticCharField"), { onEnter(args) { [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticCharField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval}`); } });
            break;
        case "GetStaticShortField":
            listener = Interceptor.attach(getJAddr("GetStaticShortField"), {
                onEnter(args) {
                    [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticShortField", args);
                },
                onLeave(retval) {
                    unidbg_1.LogNumReturn("GetStaticShortField", this.signature, retval.toUInt32());
                }
            });
            break;
        case "GetStaticIntField":
            listener = Interceptor.attach(getJAddr("GetStaticIntField"), {
                onEnter(args) {
                    [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticIntField", args);
                },
                onLeave(retval) {
                    unidbg_1.LogNumReturn("GetStaticIntField", this.signature, retval.toUInt32());
                }
            });
            break;
        case "GetStaticLongField":
            listener = Interceptor.attach(getJAddr("GetStaticLongField"), {
                onEnter(args) {
                    [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticLongField", args);
                },
                onLeave(retval) {
                    unidbg_1.LogLongReturn("GetStaticLongField", this.signature, retval.toUInt32());
                }
            });
            break;
        case "GetStaticFloatField":
            listener = Interceptor.attach(getJAddr("GetStaticFloatField"), { onEnter(args) { [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticFloatField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval}`); } });
            break;
        case "GetStaticDoubleField":
            listener = Interceptor.attach(getJAddr("GetStaticDoubleField"), { onEnter(args) { [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticDoubleField", args); }, onLeave(retval) { logger_1.log(`${this.base_msg} ${this.signature} ${retval}`); } });
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
                    if (show_cache_log)
                        logger_1.log(`/* TID ${this.tid} */ JNIENv->GetMethodID ${this.name}->${this.sig} jmethodID ${retval}`);
                }
            });
            break;
        case "CallObjectMethod":
            listener = Interceptor.attach(getJAddr("CallObjectMethod"), { onEnter(args) { CallXXXXMethodX("CallObjectMethod", args); } });
            break;
        case "CallObjectMethodV":
            listener = Interceptor.attach(getJAddr("CallObjectMethodV"), {
                onEnter(args) {
                    this.log_msg = CallXXXXMethodXRET("CallObjectMethodV", args);
                },
                onLeave(retval) {
                    let val = retval;
                    if (this.log_msg.endsWith(")Ljava/lang/String;")) {
                        val = Java.vm.tryGetEnv().getStringUtfChars(val).readUtf8String();
                    }
                    else if (this.log_msg.endsWith(")Ljava/lang/Class;")) {
                        val = Java.vm.tryGetEnv().getClassName(val);
                        ;
                    }
                    else if (this.log_msg.endsWith(")I")) {
                        val = val.toUInt32();
                    }
                    logger_1.log(`${this.log_msg} ${val}`);
                },
            });
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
                    if (show_cache_log)
                        logger_1.log(`/* TID ${this.tid} */ JNIENv->GetStaticMethodID ${this.name}->${this.sig} jmethodID ${retval}`);
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
function java_hook() {
    Java.perform(function () {
        let cls = Java.use("android.content.pm.Signature");
        console.log("clscls", cls);
        cls.toCharsString.overload().implementation = function () {
            let ret = this.toCharsString();
            console.log("000", ret);
            return ret;
        };
    });
}
// setTimeout(() => {
// java_hook()
// }, 300);
function hook_all_jni() {
    for (let index in jni_struct_array) {
        // log(jni_struct_array[index])
        hook_jni(jni_struct_array[index]);
    }
}
let show_cache_log = false;
// init_jfieldID_by_cls_name("java.io.FileDescriptor");
init_jfieldID_by_cls_name("java.util.zip.Deflater");
// init_jfieldID_by_cls_name("android.graphics.BitmapFactory");
// init_jfieldID_by_cls_name("android.graphics.BitmapFactory$Options");
// init_jfieldID_by_cls_name("com.android.org.conscrypt.NativeRef");
// 非系统类 可能需要切换PathClassLoader
// init_jfieldID_by_cls_name("com.facebook.animated.webp.WebPFrame");
// init_jfieldID_by_cls_name("tv.danmaku.ijk.media.player.IjkMediaPlayer");
hook_all_jni();
// hook_jni("GetStringUTFChars");
// hook_jni("SetByteArrayRegion");
// hook_jni("GetFieldID");
// hook_jni("GetObjectField");
// hook_jni("GetStaticFieldID");
// hook_jni("GetStaticIntField");
// hook_jni("GetStaticLongField");
// hook_jni("GetStaticShortField");
// hook_jni("GetMethodID");
// hook_jni("CallObjectMethod");
// hook_jni("GetStaticMethodID");

},{"./logger":2,"./templates/unidbg":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
function log(message) {
    console.log(message);
}
exports.log = log;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLongReturn = exports.LogNumReturn = exports.LogClassReturn = exports.LogStringReturn = exports.CertificateMeta = void 0;
const logger_1 = require("../logger");
function CertificateMeta(signAlgorithm, signAlgorithmOID, startDate, endDate, data, certBase64Md5, certMd5) {
    let code = [
        `case "android/content/pm/PackageInfo->signatures:[Landroid/content/pm/Signature;":`,
        `    CertificateMeta meta = new CertificateMeta(`,
        `        "${signAlgorithm}",`,
        `        "${signAlgorithmOID}",`,
        `        new Date(${startDate}L),`,
        `        new Date(${endDate}L),`,
        `        hexStringToBytes("${data}"),`,
        `        "${certBase64Md5}",`,
        `        "${certMd5}"`,
        `);`,
        `return new ArrayObject(new Signature[]{new Signature(vm, meta)});`
    ];
    logger_1.log(`----------------getObjectField----------------\n${code.join("    \n")}`);
}
exports.CertificateMeta = CertificateMeta;
function LogStringReturn(override_name, signature, field_msg) {
    let code = [
        `case "${signature}":`,
        `    return new StringObject(vm, "${field_msg}");`,
    ];
    logger_1.log(`----------------${override_name}----------------\n${code.join("    \n")}`);
}
exports.LogStringReturn = LogStringReturn;
function LogClassReturn(override_name, signature, field_msg) {
    let code = [
        `case "${signature}":`,
        `    return vm.resolveClass("${field_msg}");`,
    ];
    logger_1.log(`----------------${override_name}----------------\n${code.join("    \n")}`);
}
exports.LogClassReturn = LogClassReturn;
function LogNumReturn(override_name, signature, field_msg) {
    let code = [
        `case "${signature}":`,
        `    return ${field_msg};`,
    ];
    logger_1.log(`----------------${override_name}----------------\n${code.join("    \n")}`);
}
exports.LogNumReturn = LogNumReturn;
function LogLongReturn(override_name, signature, field_msg) {
    let code = [
        `case "${signature}":`,
        `    return ${field_msg}L;`,
    ];
    logger_1.log(`----------------${override_name}----------------\n${code.join("    \n")}`);
}
exports.LogLongReturn = LogLongReturn;

},{"../logger":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZ2VudC9pbmRleC50cyIsImFnZW50L2xvZ2dlci50cyIsImFnZW50L3RlbXBsYXRlcy91bmlkYmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHFDQUErQjtBQUMvQiwrQ0FBbUg7QUFFbkgsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JGLE1BQU0sTUFBTSxHQUFHLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNyRixNQUFNLE1BQU0sR0FBRyxJQUFJLGNBQWMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFckYsSUFBSSxnQkFBZ0IsR0FBRztJQUNuQixXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxVQUFVO0lBQzVPLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLFdBQVc7SUFDbFAsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGtC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LFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsSUFBSSxJQUFHLG9CQUFvQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUFBLE1BQU07UUFDbEosS0FBSyx1QkFBdUI7WUFDeEIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsSUFBSSxJQUFHLG9CQUFvQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUFBLE1BQU07UUFDbEosS0FBSyx1QkFBdUI7WUFDeEIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsSUFBSSxJQUFHLG9CQUFvQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUFBLE1BQU07UUFDbEosS0FBSyx3QkFBd0I7WUFDekIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsSUFBSSxJQUFHLG9CQUFvQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUFBLE1BQU07UUFDcEosS0FBSyx3QkFBd0I7WUFDekIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsRUFBQyxPQUFPLENBQUMsSUFBSSxJQUFHLG9CQUFvQixDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxDQUFBLENBQUEsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUFBLE1BQU07UUFDcEosS0FBSyx3QkFBd0I7WUFDekIsUUFBUSxHQUFH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

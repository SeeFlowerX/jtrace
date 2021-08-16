(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const unidbg_1 = require("./templates/unidbg");
let jnienv_addr = null;
let get_env_flag = false;
function get_env_addr() {
    Java.perform(function () {
        jnienv_addr = Java.vm.getEnv().handle.readPointer();
    });
}
const gettid = new NativeFunction(Module.getExportByName(null, 'gettid'), 'int', []);
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
function getJAddr(func_name) {
    // 通过函数名获取到对应的jni函数地址
    if (!get_env_flag) {
        // 只获取一次 JNIEnv 的地址 不知道有没有问题
        get_env_flag = true;
        get_env_addr();
    }
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
function XXXFieldRETV2(name, args) {
    // return `${Java.vm.tryGetEnv().getClassName(args[1])}`;
    let base_msg = `/* TID ${gettid()} */ JNIENv->${name}`;
    let class_name = Java.vm.tryGetEnv().getObjectClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)) {
        return [base_msg, `${class_name.replaceAll(".", "/")}->${jfieldIDs.get(`${args[2]}`)}`, class_name];
    }
    return [base_msg, `${class_name.replaceAll(".", "/")}->${args[2]}`, class_name];
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
                    if (show_cache_log)
                        logger_1.log(`/* TID ${this.tid} */ JNIENv->GetFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                }
            });
            break;
        case "GetObjectField":
            listener = Interceptor.attach(getJAddr("GetObjectField"), {
                onEnter(args) { [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("GetObjectField", args); },
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
                    else if (!switch_flag && !blacklist_XXXField.includes(this.class_name)) {
                        logger_1.log(`${this.base_msg} ${this.signature} ${retval}`);
                    }
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
            listener = Interceptor.attach(getJAddr("GetLongField"), {
                onEnter(args) {
                    [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("GetLongField", args);
                },
                onLeave(retval) {
                    if (!blacklist_XXXField.includes(this.class_name)) {
                        logger_1.log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}L`);
                    }
                }
            });
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
                    [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("SetObjectField", args);
                    let val = args[3];
                    if (this.signature.endsWith(":Ljava/lang/String;")) {
                        val = Java.vm.tryGetEnv().getStringUtfChars(val).readUtf8String();
                    }
                    else if (this.signature.endsWith(":Ljava/lang/Class;")) {
                        val = Java.vm.tryGetEnv().getClassName(val);
                    }
                    else if (!blacklist_XXXField.includes(this.class_name)) {
                        logger_1.log(`${this.base_msg} ${this.signature} ${val}`);
                    }
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
            listener = Interceptor.attach(getJAddr("SetIntField"), {
                onEnter(args) {
                    [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("SetIntField", args);
                    if (!blacklist_XXXField.includes(this.class_name)) {
                        logger_1.log(`${this.base_msg} ${this.signature} ${args[3].toUInt32()}`);
                    }
                }
            });
            break;
        case "SetLongField":
            listener = Interceptor.attach(getJAddr("SetLongField"), {
                onEnter(args) {
                    [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("SetLongField", args);
                },
                onLeave(retval) {
                    if (!blacklist_XXXField.includes(this.class_name)) {
                        logger_1.log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}L`);
                    }
                }
            });
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
                        logger_1.log(`${this.base_msg} ${this.signature} ${retval}`);
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
function hook_all_jni() {
    Java.perform(function () {
        for (let index in jni_struct_array) {
            hook_jni(jni_struct_array[index]);
        }
    });
}
let show_cache_log = false;
// 对于某些频繁出现的系统类进行过滤
let blacklist_XXXField = [
    'android.graphics.Rect',
    'android.text.BoringLayout$Metrics',
    'android.graphics.Paint$FontMetricsInt',
    'android.graphics.BitmapFactory$Options',
    'android.content.res.Configuration',
    'android.content.res.AssetManager',
    'android.view.Surface',
    'android.util.TypedValue',
    'android.os.Parcel',
    'android.os.BinderProxy',
    'android.view.InputChannel',
    'java.lang.Thread',
    'android.view.ViewRootImpl$W',
    'java.io.FileDescriptor',
    'android.content.ContentProvider$Transport',
    'android.graphics.Bitmap',
    'android.graphics.Bitmap$Config',
];
function hook_custom_jni() {
    Java.perform(function () {
        // init_jfieldID_by_cls_name("java.io.FileDescriptor");
        // init_jfieldID_by_cls_name("java.util.zip.Deflater");
        // init_jfieldID_by_cls_name("android.graphics.BitmapFactory");
        // init_jfieldID_by_cls_name("android.graphics.BitmapFactory$Options");
        // init_jfieldID_by_cls_name("com.android.org.conscrypt.NativeRef");
        // // 非系统类 可能需要切换PathClassLoader
        // init_jfieldID_by_cls_name("com.facebook.animated.webp.WebPFrame");
        // init_jfieldID_by_cls_name("tv.danmaku.ijk.media.player.IjkMediaPlayer");
        // hook_jni("GetStringUTFChars");
        // hook_jni("SetByteArrayRegion");
        hook_jni("GetFieldID");
        hook_jni("GetObjectField");
        hook_jni("GetStaticFieldID");
        // hook_jni("GetStaticIntField");
        // hook_jni("GetStaticLongField");
        // hook_jni("GetStaticShortField");
        // hook_jni("GetMethodID");
        // hook_jni("CallObjectMethod");
        // hook_jni("GetStaticMethodID");
    });
}
hook_all_jni();
// hook_custom_jni();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZ2VudC9pbmRleF9zdGFibGUudHMiLCJhZ2VudC9sb2dnZXIudHMiLCJhZ2VudC90ZW1wbGF0ZXMvdW5pZGJnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxxQ0FBK0I7QUFDL0IsK0NBQW1IO0FBRW5ILElBQUksV0FBVyxHQUFRLElBQUksQ0FBQztBQUM1QixJQUFJLFlBQVksR0FBWSxLQUFLLENBQUM7QUFFbEMsU0FBUyxZQUFZO0lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDVCxXQUFXLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEQsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRXJGLElBQUksZ0JBQWdCLEdBQUc7SUFDbkIsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsVUFBVTtJQUM1TyxtQkFBbUIsRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLHFCQUFxQixFQUFFLGFBQWEsRUFBRSxXQUFXO0lBQ2xQLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFB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QUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQy9JLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3pJLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3pJLEtBQUsscUJBQXFCO1lBQ3RCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQzNJLEtBQUssbUJBQW1CO1lBQ3BCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsRUFBQyxDQUFDLENBQUM7WUFBQSxNQUFNO1FBQ3ZJLEtBQUssb0JBQW9CO1lBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEVBQUMsT0FBTyxDQUFDLElBQUksSUFBRyxpQkFBaUIsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFBLENB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QjtZQUMzQixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUN4SixLQUFLLDBCQUEwQjtZQUMzQixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsMEJBQTBCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUN4SixLQUFLLHNCQUFzQjtZQUN2QixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUNoSixLQUFLLHVCQUF1QjtZQUN4QixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUNsSixLQUFLLHVCQUF1QjtZQUN4QixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUNsSixLQUFLLHNCQUFz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QjtZQUN4QixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUNsSixLQUFLLHVCQUF1QjtZQUN4QixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUNsSixLQUFLLHVCQUF1QjtZQUN4QixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUNsSixLQUFLLHdCQUF3QjtZQUN6QixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUNwSixLQUFLLHdCQUF3QjtZQUN6QixRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRSxFQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUcsb0JBQW9CLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTTtRQUNwSixLQUFLLHdCQUF3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

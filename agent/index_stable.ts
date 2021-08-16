import { log } from "./logger";
import { CertificateMeta, LogStringReturn, LogClassReturn, LogNumReturn, LogLongReturn } from "./templates/unidbg";

let jnienv_addr: any = null;
let get_env_flag: boolean = false;

function get_env_addr(){
    Java.perform(function(){
        jnienv_addr = Java.vm.getEnv().handle.readPointer();
    })
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
]


function getJAddr(func_name: string){
    // 通过函数名获取到对应的jni函数地址
    if(!get_env_flag){
        // 只获取一次 JNIEnv 的地址 不知道有没有问题
        get_env_flag = true;
        get_env_addr();
    }
    let offset = jni_struct_array.indexOf(func_name) * Process.pointerSize;
    return jnienv_addr.add(offset).readPointer();
}

function CallXXXXMethodX(name: string, args: NativePointer[]){
    let class_name: string = Java.vm.tryGetEnv().getObjectClassName(args[1]);
    if (jmethodIDs.has(`${args[2]}`)){
        log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name.replaceAll(".", "/")}->${jmethodIDs.get(`${args[2]}`)}`);
    }
}

function CallXXXXMethodXRET(name: string, args: NativePointer[]){
    let class_name: string = Java.vm.tryGetEnv().getObjectClassName(args[1]);
    if (jmethodIDs.has(`${args[2]}`)){
        return `/* TID ${gettid()} */ JNIENv->${name} ${class_name.replaceAll(".", "/")}->${jmethodIDs.get(`${args[2]}`)}`;
    }
    return `/* TID ${gettid()} */ JNIENv->${name} ${class_name.replaceAll(".", "/")}->${args[2]}`;
}

function CallStaticXXXMethodX(name: string, args: NativePointer[]){
    let class_name: string = Java.vm.tryGetEnv().getClassName(args[1]);
    if (jmethodIDs.has(`${args[2]}`)){
        log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name.replaceAll(".", "/")}->${jmethodIDs.get(`${args[2]}`)}`);
    }
}

function XXXStaticXXXField(name: string, args: NativePointer[]){
    let class_name: string = Java.vm.tryGetEnv().getClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)){
        log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name} ${jfieldIDs.get(`${args[2]}`)}`);
    }
}

function XXXStaticXXXFieldRET(name: string, args: NativePointer[]): [string, string]{
    let base_msg = `/* TID ${gettid()} */ JNIENv->${name}`;
    let class_name: string = Java.vm.tryGetEnv().getClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)){
        return [base_msg, `${class_name.replaceAll(".", "/")}->${jfieldIDs.get(`${args[2]}`)}`];
    }
    return [base_msg, `${class_name.replaceAll(".", "/")}->${args[2]}`];
}

function XXXFieldRET(name: string, args: NativePointer[]): [string, string]{
    // return `${Java.vm.tryGetEnv().getClassName(args[1])}`;
    let base_msg = `/* TID ${gettid()} */ JNIENv->${name}`;
    let class_name: string = Java.vm.tryGetEnv().getObjectClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)){
        return [base_msg, `${class_name.replaceAll(".", "/")}->${jfieldIDs.get(`${args[2]}`)}`];
    }
    return [base_msg, `${class_name.replaceAll(".", "/")}->${args[2]}`];
}

function XXXFieldRETV2(name: string, args: NativePointer[]): [string, string, string]{
    // return `${Java.vm.tryGetEnv().getClassName(args[1])}`;
    let base_msg = `/* TID ${gettid()} */ JNIENv->${name}`;
    let class_name: string = Java.vm.tryGetEnv().getObjectClassName(args[1]);
    if (jfieldIDs.has(`${args[2]}`)){
        return [base_msg, `${class_name.replaceAll(".", "/")}->${jfieldIDs.get(`${args[2]}`)}`, class_name];
    }
    return [base_msg, `${class_name.replaceAll(".", "/")}->${args[2]}`, class_name];
}

function init_jfieldID_by_cls_name(cls_name: string){
    Java.perform(function(){
        let DeflaterCls = Java.use(cls_name);
        let fields = DeflaterCls.class.getDeclaredFields();
        for (let i = 0; i < fields.length; i++){
            try{
                let cls_field = fields[i];
                cls_field.setAccessible(true);
                let name = cls_field.getName();
                // console.log("**--*", cls_field, name)
                if (name == "$assertionsDisabled") continue;
                let sig_name: string = cls_field.getType().getName();
                if(name2sig.has(sig_name)){
                    let sig = name2sig.get(sig_name);
                    let clazz = Java.vm.tryGetEnv().findClass(cls_name.replaceAll(".", "/"));
                    let jfieldID = Java.vm.tryGetEnv().getFieldId(clazz, name, sig);
                    jfieldIDs.set(`${jfieldID}`, `${name}:${sig}`);
                    console.log("***", cls_field, name, clazz, jfieldID)
                    // 调用了getFieldId 这里不用设置 jfieldIDs
                }
            }
            catch(e){
            }

        }
    })
}

function bytes2hex(array: any) {
    let result = '';
    for(let i = 0; i < array.length; ++i)
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    return result;
}

function md5Digest_bytes(input: any) {
    let digest = Java.use("java.security.MessageDigest").getInstance("md5");
    digest.update(input);
    return bytes2hex(digest.digest());
}

function md5Digest_string(input: any) {
    let digest = Java.use("java.security.MessageDigest").getInstance("md5");
    let charset = Java.use("java.nio.charset.StandardCharsets").UTF_8.value
    digest.update(input.getBytes(charset));
    return bytes2hex(digest.digest());
}

function LogSignatureMetadata(obj: any){
    let cf = Java.use("java.security.cert.CertificateFactory").getInstance("X.509");
    let is = Java.use("java.io.ByteArrayInputStream").$new(obj.toByteArray());
    let cert = Java.cast(cf.generateCertificate(is), Java.use("java.security.cert.X509Certificate"));
    let buf = cert.getEncoded();
    let sighex = bytes2hex(buf);
    let publicKeyString = Java.use("java.lang.String").$new(sighex.toUpperCase());
    CertificateMeta(
        cert.getSigAlgName().toUpperCase(),
        cert.getSigAlgOID(),
        cert.getNotBefore().getTime(),
        cert.getNotAfter().getTime(),
        sighex,
        md5Digest_bytes(buf),
        md5Digest_string(publicKeyString),
    );
}

let jmethodIDs = new Map<string, string>();
let jfieldIDs = new Map<string, string>();
let name2sig = new Map<string, string>();

name2sig.set("boolean", "Z");
name2sig.set("byte", "B");
name2sig.set("char", "C");
name2sig.set("short", "S");
name2sig.set("int", "I");
name2sig.set("long", "J");
name2sig.set("float", "F");
name2sig.set("double", "D");

function hook_jni(func_name: string){
    if(func_name.includes("reserved")) return;
    let listener = null;
    switch (func_name){
        case "SetByteArrayRegion":
            listener = Interceptor.attach(getJAddr("SetByteArrayRegion"), {
                onEnter: function(args){
                    let buf_len = args[3].toUInt32();
                    if (buf_len > 256){
                        buf_len = 256;
                    }
                    let buffer_hex = hexdump(args[4].add(args[2].toUInt32()), {offset: 0, length: buf_len, header: true, ansi: false});
                    log(`/* TID ${gettid()} */ JNIENv->SetByteArrayRegion ${buffer_hex}`)
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
                    if(show_cache_log) log(`/* TID ${this.tid} */ JNIENv->GetFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                }
            });
            break;
        case "GetObjectField":
            listener = Interceptor.attach(getJAddr("GetObjectField"), {
                onEnter(args) {[this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("GetObjectField", args)},
                onLeave(retval){
                    let switch_flag = true;
                    // console.log("this.signaturethis.signature", this.signature)
                    switch(this.signature){
                        case "android/content/pm/PackageInfo->signatures:[Landroid/content/pm/Signature;":
                            let length = Java.vm.tryGetEnv().getArrayLength(retval);
                            for (let i = 0; i < length; i++){
                                let jobj = Java.vm.tryGetEnv().getObjectArrayElement(retval, i);
                                let obj = Java.cast(jobj, Java.use("android.content.pm.Signature"));
                                LogSignatureMetadata(obj);
                            }
                            break;
                        default:
                            switch_flag = false;
                    }
                    if (!switch_flag && this.signature.endsWith(":Ljava/lang/String;")){
                        let field_msg = Java.vm.tryGetEnv().getStringUtfChars(retval).readUtf8String();
                        LogStringReturn("GetObjectField", this.signature, field_msg);
                    }
                    else if (!switch_flag && this.signature.endsWith(":Ljava/lang/Class;")){
                        let field_msg = Java.vm.tryGetEnv().getClassName(retval);
                        LogClassReturn("GetObjectField", this.signature, field_msg);
                    }
                    else if (!switch_flag && !blacklist_XXXField.includes(this.class_name)){
                        log(`${this.base_msg} ${this.signature} ${retval}`)
                    }
                }
            });
            break;
        case "GetBooleanField":
            listener = Interceptor.attach(getJAddr("GetBooleanField"), {onEnter(args) {[this.base_msg, this.signature] = XXXFieldRET("GetBooleanField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${Boolean(retval.toUInt32())}`)}});break;
        case "GetByteField":
            listener = Interceptor.attach(getJAddr("GetByteField"), {onEnter(args) {[this.base_msg, this.signature] = XXXFieldRET("GetByteField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval}`)}});break;
        case "GetCharField":
            listener = Interceptor.attach(getJAddr("GetCharField"), {onEnter(args) {[this.base_msg, this.signature] = XXXFieldRET("GetCharField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval}`)}});break;
        case "GetShortField":
            listener = Interceptor.attach(getJAddr("GetShortField"), {onEnter(args) {[this.base_msg, this.signature] = XXXFieldRET("GetShortField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}`)}});break;
        case "GetIntField":
            listener = Interceptor.attach(getJAddr("GetIntField"), {onEnter(args) {[this.base_msg, this.signature] = XXXFieldRET("GetIntField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}`)}});break;
        case "GetLongField":
            listener = Interceptor.attach(getJAddr("GetLongField"), {
                onEnter(args) {
                    [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("GetLongField", args)
                },
                onLeave(retval){
                    if(!blacklist_XXXField.includes(this.class_name)){
                        log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}L`)
                    }
                }
            });
            break;
        case "GetFloatField":
            listener = Interceptor.attach(getJAddr("GetFloatField"), {onEnter(args) {[this.base_msg, this.signature] = XXXFieldRET("GetFloatField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval}`)}});break;
        case "GetDoubleField":
            listener = Interceptor.attach(getJAddr("GetDoubleField"), {onEnter(args) {[this.base_msg, this.signature] = XXXFieldRET("GetDoubleField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval}`)}});break;
        case "SetObjectField":
            listener = Interceptor.attach(getJAddr("SetObjectField"), {
                onEnter(args) {
                    [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("SetObjectField", args);
                    let val: any = args[3];
                    if(this.signature.endsWith(":Ljava/lang/String;")){
                        val = Java.vm.tryGetEnv().getStringUtfChars(val).readUtf8String();
                    }
                    else if(this.signature.endsWith(":Ljava/lang/Class;")){
                        val = Java.vm.tryGetEnv().getClassName(val);
                    }
                    else if(!blacklist_XXXField.includes(this.class_name)){
                        log(`${this.base_msg} ${this.signature} ${val}`)
                    }
                }
            });
            break;
        case "SetBooleanField":
            listener = Interceptor.attach(getJAddr("SetBooleanField"), {onEnter(args) {log(`${XXXFieldRET("SetBooleanField", args)} ${Boolean(args[3].toUInt32())}`)}});break;
        case "SetByteField":
            listener = Interceptor.attach(getJAddr("SetByteField"), {onEnter(args) {log(`${XXXFieldRET("SetByteField", args)} ${args[3]}`)}});break;
        case "SetCharField":
            listener = Interceptor.attach(getJAddr("SetCharField"), {onEnter(args) {log(`${XXXFieldRET("SetCharField", args)} ${args[3]}`)}});break;
        case "SetShortField":
            listener = Interceptor.attach(getJAddr("SetShortField"), {onEnter(args) {log(`${XXXFieldRET("SetShortField", args)} ${args[3].toUInt32()}`)}});break;
        case "SetIntField":
            listener = Interceptor.attach(getJAddr("SetIntField"), {
                onEnter(args) {
                    [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("SetIntField", args)
                    if(!blacklist_XXXField.includes(this.class_name)){
                        log(`${this.base_msg} ${this.signature} ${args[3].toUInt32()}`)
                    }
                }
            });
            break;
        case "SetLongField":
            listener = Interceptor.attach(getJAddr("SetLongField"), {
                onEnter(args) {
                    [this.base_msg, this.signature, this.class_name] = XXXFieldRETV2("SetLongField", args)
                },
                onLeave(retval){
                    if(!blacklist_XXXField.includes(this.class_name)){
                        log(`${this.base_msg} ${this.signature} ${retval.toUInt32()}L`)
                    }
                }
            });
            break;
        case "SetFloatField":
            listener = Interceptor.attach(getJAddr("SetFloatField"), {onEnter(args) {log(`${XXXFieldRET("SetFloatField", args)} ${args[3]}`)}});break;
        case "SetDoubleField":
            listener = Interceptor.attach(getJAddr("SetDoubleField"), {onEnter(args) {log(`${XXXFieldRET("SetDoubleField", args)} ${args[3]}`)}});break;
        case "GetStaticFieldID":
            listener = Interceptor.attach(getJAddr("GetStaticFieldID"), {
                onEnter(args) {
                    this.tid = gettid();
                    this.name = Java.vm.tryGetEnv().getClassName(args[1]);
                    this.sig = `${args[2].readUtf8String()}:${args[3].readUtf8String()}`;
                },
                onLeave(retval) {
                    jfieldIDs.set(`${retval}`, this.sig);
                    if(show_cache_log) log(`/* TID ${this.tid} */ JNIENv->GetStaticFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                }
            });
            break;
        case "GetStaticObjectField":
            listener = Interceptor.attach(getJAddr("GetStaticObjectField"), {
                onEnter(args) {[this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticObjectField", args)},
                onLeave(retval){
                    if(this.signature.endsWith(":Ljava/lang/String;")){
                        let field_msg = Java.vm.tryGetEnv().getStringUtfChars(retval).readUtf8String();
                        LogStringReturn("GetStaticObjectField", this.signature, field_msg);
                    }
                    else if(this.signature.endsWith(":Ljava/lang/Class;")){
                        let field_msg = Java.vm.tryGetEnv().getClassName(retval);
                        LogClassReturn("GetStaticObjectField", this.signature, field_msg);
                    }
                    else if(this.signature.endsWith(":I")){
                        LogNumReturn("GetStaticObjectField", this.signature, retval.toUInt32());
                    }
                    else if(this.signature.endsWith(":J")){
                        LogLongReturn("GetStaticObjectField", this.signature, retval.toUInt32());
                    }
                    else{
                        log(`${this.base_msg} ${this.signature} ${retval}`)
                    }
                }
            });
            break;
        case "GetStaticBooleanField":
            listener = Interceptor.attach(getJAddr("GetStaticBooleanField"), {onEnter(args) {[this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticBooleanField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${Boolean(retval.toUInt32())}`)}});break;
        case "GetStaticByteField":
            listener = Interceptor.attach(getJAddr("GetStaticByteField"), {onEnter(args) {[this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticByteField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval}`)}});break;
        case "GetStaticCharField":
            listener = Interceptor.attach(getJAddr("GetStaticCharField"), {onEnter(args) {[this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticCharField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval}`)}});break;
        case "GetStaticShortField":
            listener = Interceptor.attach(getJAddr("GetStaticShortField"), {
                onEnter(args) {
                    [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticShortField", args)
                },
                onLeave(retval){
                    LogNumReturn("GetStaticShortField", this.signature, retval.toUInt32());
                }}
            );
            break;
        case "GetStaticIntField":
            listener = Interceptor.attach(getJAddr("GetStaticIntField"), {
                onEnter(args) {
                    [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticIntField", args)
                },
                onLeave(retval){
                    LogNumReturn("GetStaticIntField", this.signature, retval.toUInt32());
                }}
            );
            break;
        case "GetStaticLongField":
            listener = Interceptor.attach(getJAddr("GetStaticLongField"), {
                onEnter(args) {
                    [this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticLongField", args)
                },
                onLeave(retval){
                    LogLongReturn("GetStaticLongField", this.signature, retval.toUInt32());
                }}
            );
            break;
        case "GetStaticFloatField":
            listener = Interceptor.attach(getJAddr("GetStaticFloatField"), {onEnter(args) {[this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticFloatField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval}`)}});break;
        case "GetStaticDoubleField":
            listener = Interceptor.attach(getJAddr("GetStaticDoubleField"), {onEnter(args) {[this.base_msg, this.signature] = XXXStaticXXXFieldRET("GetStaticDoubleField", args)}, onLeave(retval){log(`${this.base_msg} ${this.signature} ${retval}`)}});break;
        case "SetStaticObjectField":
            listener = Interceptor.attach(getJAddr("SetStaticObjectField"), {onEnter(args) {XXXStaticXXXField("SetStaticObjectField", args)}});break;
        case "SetStaticBooleanField":
            listener = Interceptor.attach(getJAddr("SetStaticBooleanField"), {onEnter(args) {XXXStaticXXXField("SetStaticBooleanField", args)}});break;
        case "SetStaticByteField":
            listener = Interceptor.attach(getJAddr("SetStaticByteField"), {onEnter(args) {XXXStaticXXXField("SetStaticByteField", args)}});break;
        case "SetStaticCharField":
            listener = Interceptor.attach(getJAddr("SetStaticCharField"), {onEnter(args) {XXXStaticXXXField("SetStaticCharField", args)}});break;
        case "SetStaticShortField":
            listener = Interceptor.attach(getJAddr("SetStaticShortField"), {onEnter(args) {XXXStaticXXXField("SetStaticShortField", args)}});break;
        case "SetStaticIntField":
            listener = Interceptor.attach(getJAddr("SetStaticIntField"), {onEnter(args) {XXXStaticXXXField("SetStaticIntField", args)}});break;
        case "SetStaticLongField":
            listener = Interceptor.attach(getJAddr("SetStaticLongField"), {onEnter(args) {XXXStaticXXXField("SetStaticLongField", args)}});break;
        case "SetStaticFloatField":
            listener = Interceptor.attach(getJAddr("SetStaticFloatField"), {onEnter(args) {XXXStaticXXXField("SetStaticFloatField", args)}});break;
        case "SetStaticDoubleField":
            listener = Interceptor.attach(getJAddr("SetStaticDoubleField"), {onEnter(args) {XXXStaticXXXField("SetStaticDoubleField", args)}});break;
        case "NewStringUTF":
            listener = Interceptor.attach(getJAddr("NewStringUTF"), {
                onEnter: function(args){
                    log(`/* TID ${gettid()} */ JNIENv->NewStringUTF ${args[1].readUtf8String()}`);
                }
            });
            break;
        case "GetStringUTFChars":
            listener = Interceptor.attach(getJAddr("GetStringUTFChars"), {
                onLeave: function(retval){
                    let msg: any;
                    try{msg = retval.readUtf8String()}catch(e){}
                    if (msg){
                        log(`/* TID ${gettid()} */ JNIENv->GetStringUTFChars ${msg}`);
                    }
                }
            });
            break;
        case "FindClass":
            listener = Interceptor.attach(getJAddr("FindClass"), {
                onEnter: function(args){
                    log(`/* TID ${gettid()} */ JNIENv->FindClass ${args[1].readUtf8String()}`);
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
                    if(show_cache_log) log(`/* TID ${this.tid} */ JNIENv->GetMethodID ${this.name}->${this.sig} jmethodID ${retval}`);
                }
            });
            break;
        case "CallObjectMethod":
            listener = Interceptor.attach(getJAddr("CallObjectMethod"), {onEnter(args) {CallXXXXMethodX("CallObjectMethod", args)}});break;
        case "CallObjectMethodV":
            listener = Interceptor.attach(getJAddr("CallObjectMethodV"), {
                onEnter(args) {
                    this.log_msg = CallXXXXMethodXRET("CallObjectMethodV", args);
                },
                onLeave(retval) {
                    let val: any = retval;
                    if(this.log_msg.endsWith(")Ljava/lang/String;")){
                        val = Java.vm.tryGetEnv().getStringUtfChars(val).readUtf8String();
                    }
                    else if(this.log_msg.endsWith(")Ljava/lang/Class;")){
                        val = Java.vm.tryGetEnv().getClassName(val);;
                    }
                    else if(this.log_msg.endsWith(")I")){
                        val = val.toUInt32();
                    }
                    log(`${this.log_msg} ${val}`)
                },
            });
                break;
        case "CallObjectMethodA":
            listener = Interceptor.attach(getJAddr("CallObjectMethodA"), {onEnter(args) {CallXXXXMethodX("CallObjectMethodA", args)}});break;
        case "CallBooleanMethod":
            listener = Interceptor.attach(getJAddr("CallBooleanMethod"), {onEnter(args) {CallXXXXMethodX("CallBooleanMethod", args)}});break;
        case "CallBooleanMethodV":
            listener = Interceptor.attach(getJAddr("CallBooleanMethodV"), {onEnter(args) {CallXXXXMethodX("CallBooleanMethodV", args)}});break;
        case "CallBooleanMethodA":
            listener = Interceptor.attach(getJAddr("CallBooleanMethodA"), {onEnter(args) {CallXXXXMethodX("CallBooleanMethodA", args)}});break;
        case "CallByteMethod":
            listener = Interceptor.attach(getJAddr("CallByteMethod"), {onEnter(args) {CallXXXXMethodX("CallByteMethod", args)}});break;
        case "CallByteMethodV":
            listener = Interceptor.attach(getJAddr("CallByteMethodV"), {onEnter(args) {CallXXXXMethodX("CallByteMethodV", args)}});break;
        case "CallByteMethodA":
            listener = Interceptor.attach(getJAddr("CallByteMethodA"), {onEnter(args) {CallXXXXMethodX("CallByteMethodA", args)}});break;
        case "CallCharMethod":
            listener = Interceptor.attach(getJAddr("CallCharMethod"), {onEnter(args) {CallXXXXMethodX("CallCharMethod", args)}});break;
        case "CallCharMethodV":
            listener = Interceptor.attach(getJAddr("CallCharMethodV"), {onEnter(args) {CallXXXXMethodX("CallCharMethodV", args)}});break;
        case "CallCharMethodA":
            listener = Interceptor.attach(getJAddr("CallCharMethodA"), {onEnter(args) {CallXXXXMethodX("CallCharMethodA", args)}});break;
        case "CallShortMethod":
            listener = Interceptor.attach(getJAddr("CallShortMethod"), {onEnter(args) {CallXXXXMethodX("CallShortMethod", args)}});break;
        case "CallShortMethodV":
            listener = Interceptor.attach(getJAddr("CallShortMethodV"), {onEnter(args) {CallXXXXMethodX("CallShortMethodV", args)}});break;
        case "CallShortMethodA":
            listener = Interceptor.attach(getJAddr("CallShortMethodA"), {onEnter(args) {CallXXXXMethodX("CallShortMethodA", args)}});break;
        case "CallIntMethod":
            listener = Interceptor.attach(getJAddr("CallIntMethod"), {onEnter(args) {CallXXXXMethodX("CallIntMethod", args)}});break;
        case "CallIntMethodV":
            listener = Interceptor.attach(getJAddr("CallIntMethodV"), {onEnter(args) {CallXXXXMethodX("CallIntMethodV", args)}});break;
        case "CallIntMethodA":
            listener = Interceptor.attach(getJAddr("CallIntMethodA"), {onEnter(args) {CallXXXXMethodX("CallIntMethodA", args)}});break;
        case "CallLongMethod":
            listener = Interceptor.attach(getJAddr("CallLongMethod"), {onEnter(args) {CallXXXXMethodX("CallLongMethod", args)}});break;
        case "CallLongMethodV":
            listener = Interceptor.attach(getJAddr("CallLongMethodV"), {onEnter(args) {CallXXXXMethodX("CallLongMethodV", args)}});break;
        case "CallLongMethodA":
            listener = Interceptor.attach(getJAddr("CallLongMethodA"), {onEnter(args) {CallXXXXMethodX("CallLongMethodA", args)}});break;
        case "CallFloatMethod":
            listener = Interceptor.attach(getJAddr("CallFloatMethod"), {onEnter(args) {CallXXXXMethodX("CallFloatMethod", args)}});break;
        case "CallFloatMethodV":
            listener = Interceptor.attach(getJAddr("CallFloatMethodV"), {onEnter(args) {CallXXXXMethodX("CallFloatMethodV", args)}});break;
        case "CallFloatMethodA":
            listener = Interceptor.attach(getJAddr("CallFloatMethodA"), {onEnter(args) {CallXXXXMethodX("CallFloatMethodA", args)}});break;
        case "CallDoubleMethod":
            listener = Interceptor.attach(getJAddr("CallDoubleMethod"), {onEnter(args) {CallXXXXMethodX("CallDoubleMethod", args)}});break;
        case "CallDoubleMethodV":
            listener = Interceptor.attach(getJAddr("CallDoubleMethodV"), {onEnter(args) {CallXXXXMethodX("CallDoubleMethodV", args)}});break;
        case "CallDoubleMethodA":
            listener = Interceptor.attach(getJAddr("CallDoubleMethodA"), {onEnter(args) {CallXXXXMethodX("CallDoubleMethodA", args)}});break;
        case "CallVoidMethod":
            listener = Interceptor.attach(getJAddr("CallVoidMethod"), {onEnter(args) {CallXXXXMethodX("CallVoidMethod", args)}});break;
        case "CallVoidMethodV":
            listener = Interceptor.attach(getJAddr("CallVoidMethodV"), {onEnter(args) {CallXXXXMethodX("CallVoidMethodV", args)}});break;
        case "CallVoidMethodA":
            listener = Interceptor.attach(getJAddr("CallVoidMethodA"), {onEnter(args) {CallXXXXMethodX("CallVoidMethodA", args)}});break;
        case "CallNonvirtualObjectMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualObjectMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualObjectMethod", args)}});break;
        case "CallNonvirtualObjectMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualObjectMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualObjectMethodV", args)}});break;
        case "CallNonvirtualObjectMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualObjectMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualObjectMethodA", args)}});break;
        case "CallNonvirtualBooleanMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualBooleanMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualBooleanMethod", args)}});break;
        case "CallNonvirtualBooleanMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualBooleanMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualBooleanMethodV", args)}});break;
        case "CallNonvirtualBooleanMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualBooleanMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualBooleanMethodA", args)}});break;
        case "CallNonvirtualByteMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualByteMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualByteMethod", args)}});break;
        case "CallNonvirtualByteMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualByteMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualByteMethodV", args)}});break;
        case "CallNonvirtualByteMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualByteMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualByteMethodA", args)}});break;
        case "CallNonvirtualCharMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualCharMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualCharMethod", args)}});break;
        case "CallNonvirtualCharMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualCharMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualCharMethodV", args)}});break;
        case "CallNonvirtualCharMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualCharMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualCharMethodA", args)}});break;
        case "CallNonvirtualShortMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualShortMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualShortMethod", args)}});break;
        case "CallNonvirtualShortMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualShortMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualShortMethodV", args)}});break;
        case "CallNonvirtualShortMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualShortMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualShortMethodA", args)}});break;
        case "CallNonvirtualIntMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualIntMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualIntMethod", args)}});break;
        case "CallNonvirtualIntMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualIntMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualIntMethodV", args)}});break;
        case "CallNonvirtualIntMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualIntMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualIntMethodA", args)}});break;
        case "CallNonvirtualLongMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualLongMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualLongMethod", args)}});break;
        case "CallNonvirtualLongMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualLongMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualLongMethodV", args)}});break;
        case "CallNonvirtualLongMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualLongMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualLongMethodA", args)}});break;
        case "CallNonvirtualFloatMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualFloatMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualFloatMethod", args)}});break;
        case "CallNonvirtualFloatMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualFloatMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualFloatMethodV", args)}});break;
        case "CallNonvirtualFloatMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualFloatMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualFloatMethodA", args)}});break;
        case "CallNonvirtualDoubleMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualDoubleMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualDoubleMethod", args)}});break;
        case "CallNonvirtualDoubleMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualDoubleMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualDoubleMethodV", args)}});break;
        case "CallNonvirtualDoubleMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualDoubleMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualDoubleMethodA", args)}});break;
        case "CallNonvirtualVoidMethod":
            listener = Interceptor.attach(getJAddr("CallNonvirtualVoidMethod"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualVoidMethod", args)}});break;
        case "CallNonvirtualVoidMethodV":
            listener = Interceptor.attach(getJAddr("CallNonvirtualVoidMethodV"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualVoidMethodV", args)}});break;
        case "CallNonvirtualVoidMethodA":
            listener = Interceptor.attach(getJAddr("CallNonvirtualVoidMethodA"), {onEnter(args) {CallXXXXMethodX("CallNonvirtualVoidMethodA", args)}});break;
        case "GetStaticMethodID":
            listener = Interceptor.attach(getJAddr("GetStaticMethodID"), {
                onEnter(args) {
                    this.tid = gettid();
                    this.name = Java.vm.tryGetEnv().getClassName(args[1]);
                    this.sig = `${args[2].readUtf8String()}${args[3].readUtf8String()}`;
                },
                onLeave(retval) {
                    jmethodIDs.set(`${retval}`, this.sig);
                    if(show_cache_log) log(`/* TID ${this.tid} */ JNIENv->GetStaticMethodID ${this.name}->${this.sig} jmethodID ${retval}`);
                }
            });
            break;
        case "CallStaticObjectMethod":
            listener = Interceptor.attach(getJAddr("CallStaticObjectMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticObjectMethod", args)}});break;
        case "CallStaticObjectMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticObjectMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticObjectMethodV", args)}});break;
        case "CallStaticObjectMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticObjectMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticObjectMethodA", args)}});break;
        case "CallStaticBooleanMethod":
            listener = Interceptor.attach(getJAddr("CallStaticBooleanMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticBooleanMethod", args)}});break;
        case "CallStaticBooleanMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticBooleanMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticBooleanMethodV", args)}});break;
        case "CallStaticBooleanMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticBooleanMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticBooleanMethodA", args)}});break;
        case "CallStaticByteMethod":
            listener = Interceptor.attach(getJAddr("CallStaticByteMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticByteMethod", args)}});break;
        case "CallStaticByteMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticByteMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticByteMethodV", args)}});break;
        case "CallStaticByteMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticByteMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticByteMethodA", args)}});break;
        case "CallStaticCharMethod":
            listener = Interceptor.attach(getJAddr("CallStaticCharMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticCharMethod", args)}});break;
        case "CallStaticCharMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticCharMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticCharMethodV", args)}});break;
        case "CallStaticCharMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticCharMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticCharMethodA", args)}});break;
        case "CallStaticShortMethod":
            listener = Interceptor.attach(getJAddr("CallStaticShortMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticShortMethod", args)}});break;
        case "CallStaticShortMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticShortMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticShortMethodV", args)}});break;
        case "CallStaticShortMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticShortMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticShortMethodA", args)}});break;
        case "CallStaticIntMethod":
            listener = Interceptor.attach(getJAddr("CallStaticIntMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticIntMethod", args)}});break;
        case "CallStaticIntMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticIntMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticIntMethodV", args)}});break;
        case "CallStaticIntMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticIntMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticIntMethodA", args)}});break;
        case "CallStaticLongMethod":
            listener = Interceptor.attach(getJAddr("CallStaticLongMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticLongMethod", args)}});break;
        case "CallStaticLongMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticLongMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticLongMethodV", args)}});break;
        case "CallStaticLongMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticLongMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticLongMethodA", args)}});break;
        case "CallStaticFloatMethod":
            listener = Interceptor.attach(getJAddr("CallStaticFloatMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticFloatMethod", args)}});break;
        case "CallStaticFloatMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticFloatMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticFloatMethodV", args)}});break;
        case "CallStaticFloatMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticFloatMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticFloatMethodA", args)}});break;
        case "CallStaticDoubleMethod":
            listener = Interceptor.attach(getJAddr("CallStaticDoubleMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticDoubleMethod", args)}});break;
        case "CallStaticDoubleMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticDoubleMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticDoubleMethodV", args)}});break;
        case "CallStaticDoubleMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticDoubleMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticDoubleMethodA", args)}});break;
        case "CallStaticVoidMethod":
            listener = Interceptor.attach(getJAddr("CallStaticVoidMethod"), {onEnter(args) {CallStaticXXXMethodX("CallStaticVoidMethod", args)}});break;
        case "CallStaticVoidMethodV":
            listener = Interceptor.attach(getJAddr("CallStaticVoidMethodV"), {onEnter(args) {CallStaticXXXMethodX("CallStaticVoidMethodV", args)}});break;
        case "CallStaticVoidMethodA":
            listener = Interceptor.attach(getJAddr("CallStaticVoidMethodA"), {onEnter(args) {CallStaticXXXMethodX("CallStaticVoidMethodA", args)}});break;
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

function hook_all_jni(){
    Java.perform(function(){
        for (let index in jni_struct_array){
            hook_jni(jni_struct_array[index]);
        }
    })
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

function hook_custom_jni(){
    Java.perform(function(){
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
    })
}

hook_all_jni();
// hook_custom_jni();
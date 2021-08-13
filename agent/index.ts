import { log } from "./logger";

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
]

function jhexdump(array: any) {
    if(!array) return;
    log("---------jhexdump start---------");
    let ptr = Memory.alloc(array.length);
    for(let i = 0; i < array.length; ++i)
        ptr.add(i).writeS8(array[i]);
    log(hexdump(ptr, {offset: 0, length: array.length, header: false, ansi: false}));
    log("---------jhexdump end---------");
}

function jbhexdump(array: any) {
    log("---------jbhexdump start---------");
    let JNIENv = Java.vm.getEnv();
    let size = JNIENv.getArrayLength(array);
    let data = JNIENv.getByteArrayElements(array);
    log(hexdump(data, {offset: 0, length: 32, header: false, ansi: false}));
    JNIENv.releaseByteArrayElements(array, data, 0);
    log("---------jbhexdump end---------");
}

function dumpByteArray(obj: any){
    log("---------dumpByteArray start---------");
    let obj_ptr = ptr(obj.$h).readPointer();
    let buf_ptr = obj_ptr.add(Process.pointerSize * 3);
    let size = obj_ptr.add(Process.pointerSize * 2).readU32();
    log(hexdump(buf_ptr, {offset: 0, length: size, header: false, ansi: false}));
    log("---------dumpByteArray end---------");
}

function getJAddr(func_name: string){
    // 通过函数名获取到对应的jni函数地址
    let jnienv_addr = Java.vm.getEnv().handle.readPointer()
    let offset = jni_struct_array.indexOf(func_name) * Process.pointerSize;
    return jnienv_addr.add(offset).readPointer()
}

function CallStaticXXXMethodX(name: string, args: NativePointer[]){
    let clazz = args[1];
    let class_name: string = Java.vm.tryGetEnv().getClassName(clazz);
    if (jmethodIDs.has(`${args[2]}`)){
        log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name} ${jmethodIDs.get(`${args[2]}`)}`);
    }
}

function XXXStaticXXXField(name: string, args: NativePointer[]){
    let clazz = args[1];
    let class_name: string = Java.vm.tryGetEnv().getClassName(clazz);
    if (jfieldIDs.has(`${args[2]}`)){
        log(`/* TID ${gettid()} */ JNIENv->${name} ${class_name} ${jfieldIDs.get(`${args[2]}`)}`);
    }
}

let jmethodIDs = new Map<string, string>();
let jfieldIDs = new Map<string, string>();

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
                    let buffer_hex = hexdump(args[4], {offset: args[2].toUInt32(), length: buf_len, header: true, ansi: false});
                    log(`/* TID ${gettid()} */ JNIENv->SetByteArrayRegion ${buffer_hex}`)
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
                    log(`/* TID ${this.tid} */ JNIENv->GetFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
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
                    log(`/* TID ${this.tid} */ JNIENv->GetStaticFieldID ${this.name} ${this.sig} jfieldID ${retval}`);
                }
            });
            break;
        case "GetStaticObjectField":
            listener = Interceptor.attach(getJAddr("GetStaticObjectField"), {onEnter(args) {XXXStaticXXXField("GetStaticObjectField", args)}});break;
        case "GetStaticBooleanField":
            listener = Interceptor.attach(getJAddr("GetStaticBooleanField"), {onEnter(args) {XXXStaticXXXField("GetStaticBooleanField", args)}});break;
        case "GetStaticByteField":
            listener = Interceptor.attach(getJAddr("GetStaticByteField"), {onEnter(args) {XXXStaticXXXField("GetStaticByteField", args)}});break;
        case "GetStaticCharField":
            listener = Interceptor.attach(getJAddr("GetStaticCharField"), {onEnter(args) {XXXStaticXXXField("GetStaticCharField", args)}});break;
        case "GetStaticShortField":
            listener = Interceptor.attach(getJAddr("GetStaticShortField"), {onEnter(args) {XXXStaticXXXField("GetStaticShortField", args)}});break;
        case "GetStaticIntField":
            listener = Interceptor.attach(getJAddr("GetStaticIntField"), {onEnter(args) {XXXStaticXXXField("GetStaticIntField", args)}});break;
        case "GetStaticLongField":
            listener = Interceptor.attach(getJAddr("GetStaticLongField"), {onEnter(args) {XXXStaticXXXField("GetStaticLongField", args)}});break;
        case "GetStaticFloatField":
            listener = Interceptor.attach(getJAddr("GetStaticFloatField"), {onEnter(args) {XXXStaticXXXField("GetStaticFloatField", args)}});break;
        case "GetStaticDoubleField":
            listener = Interceptor.attach(getJAddr("GetStaticDoubleField"), {onEnter(args) {XXXStaticXXXField("GetStaticDoubleField", args)}});break;
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
                    log(`/* TID ${this.tid} */ JNIENv->GetMethodID ${this.name} ${this.sig} jmethodID ${retval}`);
                }
            });
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
                    log(`/* TID ${this.tid} */ JNIENv->GetStaticMethodID ${this.name} ${this.sig} jmethodID ${retval}`);
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
    for (let index in jni_struct_array){
        // log(jni_struct_array[index])
        hook_jni(jni_struct_array[index]);
    }
}

hook_all_jni();
// hook_jni("SetByteArrayRegion");
// hook_jni("GetFieldID");
// hook_jni("GetStaticFieldID");
// hook_jni("GetStaticObjectField");
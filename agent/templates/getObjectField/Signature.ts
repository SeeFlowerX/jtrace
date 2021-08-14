import { log } from "../../logger";


export function CertificateMeta(signAlgorithm: any, signAlgorithmOID: any, startDate: any, endDate: any, data: any, certBase64Md5: any, certMd5: any){
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
    log("----------------getObjectField----------------\n" + code.join("    \n"));
}
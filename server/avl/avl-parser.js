export function Parser(pdu) {
    if (pdu && (pdu.length == 15 || (pdu[0] === ">" && pdu[pdu.length - 1] === "<"))) {
       return TAIP(pdu)
    }
}

function TAIP(pdu) {
    let mobileID = ''
    mobileID = pdu.length == 15 ? pdu : pdu.substring(pdu.indexOf(TAIP_INIT_MOBILEID) + 3, pdu.indexOf(TAIP_END_MOBILEID))
    console.log(mobileID.trim());
    return {
        mobileID
    }
}
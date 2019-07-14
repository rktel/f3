export function Parser(pdu) {
    if (pdu && (pdu.length == 15 || (pdu.match(/>R./g)||[]).length > 0)) {
        
       return TAIP(pdu)
    }
}

function TAIP(pdu) {
    let mobileID = ''
    mobileID = pdu.length == 15 ? pdu : pdu.substring(pdu.indexOf(TAIP_INIT_MOBILEID) + 3, pdu.indexOf(TAIP_INIT_MOBILEID) + 3 + 15)
    //console.log(mobileID.trim());
    return {
        mobileID
    }
}
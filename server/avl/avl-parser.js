export function Parser(pdu) {
    if (pdu && (pdu.length == 15 || (pdu.match(/>R./g) || []).length > 0)) {

        return TAIP(pdu)
    }
}

function TAIP(pdu) {
    let mobileID = null

    //pdu.length == 15 ? pdu : pdu.substring(pdu.indexOf(TAIP_INIT_MOBILEID) + 3, pdu.indexOf(TAIP_INIT_MOBILEID) + 3 + 15)

    if (pdu.length == 15) {
        // heartbeat
        mobileID = pdu
    } else {
        // pdu
        mobileID = pdu.substring(pdu.indexOf(TAIP_INIT_MOBILEID) + 3, pdu.indexOf(TAIP_INIT_MOBILEID) + 3 + 15)
    }

    if (mobileID) {
        return {
            mobileID
        }
    }
}
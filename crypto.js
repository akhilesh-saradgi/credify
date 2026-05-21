const crypto = require('crypto');

function generateCertificateHash(
studentName,
examScore,
attendance
){

const rawData =
`${studentName}-${examScore}-${attendance}-${Date.now()}`;

return crypto
.createHash('sha256')
.update(rawData)
.digest('hex');

}

module.exports = {
generateCertificateHash
};
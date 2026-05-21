const crypto = require('crypto');

/**
 * Generates a unique SHA-256 hash using the student's metrics and a timestamp anchor
 */
function generateCertificateHash(studentName, examScore, attendance) {
    const uniqueSaltString = `${studentName}-${examScore}-${attendance}-${Date.now()}`;
    
    return crypto
        .createHash('sha256')
        .update(uniqueSaltString)
        .digest('hex');
}

module.exports = { generateCertificateHash };
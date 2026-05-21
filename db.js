// Temporary mock db.js file
module.exports = {
    insertCertificate: async (name, score, attendance, repo) => ({ id: "mock_id_123", student_name: name }),
    fetchCertificateById: async (id) => ({ student_name: "Test Student", exam_score: 90, attendance: 95 }),
    fetchCertificateByHash: async (hash) => ({ student_name: "Test Student", exam_score: 90, attendance: 95, status: "VERIFIED", repo_url: "facebook/react" }),
    approveCertificate: async (id, hash) => true
};
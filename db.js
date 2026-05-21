require('dotenv').config();

const { createClient } =
require('@supabase/supabase-js');

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_KEY
);

const TABLE = 'Credify';

async function insertCertificate(
studentName,
examScore,
attendance
){

try{

const { data,error } =
await supabase
.from(TABLE)
.insert([
{
student_name: studentName,
exam_score: examScore,
attendance: attendance,
status:'Pending'
}
])
.select()
.single();

if(error) throw error;

return data;

}catch(err){

console.error(err);
throw err;

}

}

async function approveCertificate(
certificateId,
generatedHash
){

try{

const { data,error } =
await supabase
.from(TABLE)
.update({
status:'Approved',
digital_hash:generatedHash
})
.eq('id',certificateId)
.select()
.single();

if(error) throw error;

return data;

}catch(err){

console.error(err);
throw err;

}

}

async function fetchCertificateByHash(hash){

try{

const { data,error } =
await supabase
.from(TABLE)
.select('*')
.eq('digital_hash',hash)
.single();

if(error) throw error;

return data;

}catch(err){

console.error(err);
throw err;

}

}

async function fetchCertificateById(id){

try{

const { data,error } =
await supabase
.from(TABLE)
.select('*')
.eq('id',id)
.single();

if(error) throw error;

return data;

}catch(err){

console.error(err);
throw err;

}

}

module.exports = {

insertCertificate,
approveCertificate,
fetchCertificateByHash,
fetchCertificateById

};
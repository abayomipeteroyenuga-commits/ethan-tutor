export default function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const configured=Boolean(process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY);
 res.status(200).json({ok:true,provider:'gemini',aiConfigured:configured,model:process.env.GEMINI_MODEL||'gemini-3.8-flash',version:'2.3'});
}

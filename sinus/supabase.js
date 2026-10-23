(function(W){
  'use strict';
  var demo=W.SINUS_DEMO===true, current=null, listeners=[], active='';
  var client=demo?null:W.supabase.createClient('https://qyioizupudjrwmtasrue.supabase.co','sb_publishable_QVy9X4SXTJA98GuZEVibOQ_8GdVkoC0',{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  function user(u){return u?{uid:u.id,email:u.email,displayName:u.user_metadata?.full_name||u.user_metadata?.name||'',isAdmin:u.app_metadata?.role==='admin'}:null}
  function emit(u){current=u;listeners.forEach(function(f){setTimeout(function(){f(u)},0)})}
  function snap(row){return {id:row?.id,exists:!!row,data:function(){return row?.payload||{}}}}
  function localKey(c,id){return 'sinus_demo_document_'+c+'_'+id}
  function readDemo(c,id){try{return JSON.parse(localStorage.getItem(localKey(c,id))||'null')}catch(e){return null}}
  function doc(path){var split=path.indexOf('/'),c=path.slice(0,split),id=path.slice(split+1);return {
    get:async function(){if(demo)return snap(readDemo(c,id));var r=await client.from('sinus_documents').select('id,payload').eq('collection',c).eq('id',id).maybeSingle();if(r.error)throw r.error;return snap(r.data)},
    set:async function(data,opts){if(demo){var old=readDemo(c,id);localStorage.setItem(localKey(c,id),JSON.stringify({id:id,payload:Object.assign({},opts?.merge?old?.payload:{},data)}));return}var r=await client.rpc('sinus_save_document',{p_collection:c,p_id:id,p_patch:data,p_merge:!!opts?.merge});if(r.error){if(r.error.code==='23505')r.error.code='whats-ocupado';throw r.error}}
  }}
  var auth={currentUser:null,onAuthStateChanged:function(f){listeners.push(f);if(current)setTimeout(function(){f(current)},0)},signOut:async function(){if(demo){emit(null);return}var r=await client.auth.signOut();if(r.error)throw r.error;emit(null)}};
  W.SinusBackend={client:client,auth:auth,db:{doc:doc,collection:function(c){return {limit:function(n){return {get:async function(){if(demo)return {forEach:function(){}};var r=await client.from('sinus_documents').select('id,payload').eq('collection',c).limit(n);if(r.error)throw r.error;return {forEach:function(f){r.data.forEach(function(row){f(snap(row))})}}}}}}}},signIn:async function(){
    if(demo){await doc('perfis/demo').set({nome:'Estudante Demo',turma:'G',whatsapp:'595981000000',email:'demo@sinus.local'});await doc('progresso/demo_sinus-perfil').set({prog:{onboarding:true,periodo:5,turma:'G',idioma:'pt',faculdade:'UCP',campus:'Ciudad del Este'}});emit({uid:'demo',email:'demo@sinus.local',displayName:'Estudante Demo',isAdmin:false});return}
    if(location.origin!=='https://meusinus.pages.dev')throw Error('Abra o SINUS em meusinus.pages.dev para entrar com segurança.');
    var r=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+'/',queryParams:{prompt:'select_account'}}});if(r.error)throw r.error;
  }};
  if(!demo){client.auth.onAuthStateChange(function(event,session){var u=user(session?.user),key=u?.uid||'';auth.currentUser=u;if(event==='INITIAL_SESSION'||event==='SIGNED_OUT'||key!==active){active=key;emit(u)}})}
  else{setTimeout(function(){var b=document.getElementById('sxEntrar');if(b)b.querySelector('span').textContent='Explorar demo da V13';var p=document.getElementById('sxMsg');if(p)p.textContent='Demonstração local · sem login e sem alterações na sua conta.';emit(null)},0)}
})(window);


(function(){
  const cfg=window.TASIAN_SUPABASE;
  let client=null;
  if(cfg && window.supabase && window.supabase.createClient){
    client=window.supabase.createClient(cfg.url,cfg.publishableKey);
    window.TASIAN_AUTH=client;
  }
  const $=s=>document.querySelector(s);
  function message(text,isError=false){
    const box=$("#authMessage"); if(!box)return;
    box.textContent=text; box.style.background=isError?"#f8e8e5":"#f4eee4";
    box.style.color=isError?"#8c3428":"#665239"; box.classList.add("show");
  }
  function friendlyError(err){
    const m=String(err?.message||"خطای نامشخص");
    if(/invalid login credentials/i.test(m))return "ایمیل یا رمز عبور درست نیست.";
    if(/email not confirmed/i.test(m))return "ابتدا ایمیل خود را از طریق لینک تأیید بررسی کنید.";
    if(/already registered/i.test(m))return "این ایمیل قبلاً ثبت‌نام کرده است؛ وارد شوید.";
    if(/password/i.test(m))return "رمز عبور باید حداقل ۸ کاراکتر باشد.";
    return "عملیات انجام نشد: "+m;
  }
  function requireClient(){if(!client){message("کتابخانه اتصال یا تنظیمات Supabase بارگذاری نشده است. اتصال اینترنت و فایل پیکربندی را بررسی کنید.",true);return false;}return true;}
  const login=$("#loginForm");
  if(login)login.addEventListener("submit",async e=>{
    e.preventDefault(); if(!requireClient())return;
    const btn=login.querySelector("button");btn.disabled=true;btn.textContent="در حال ورود...";
    const fd=new FormData(login);
    try{
      const {error}=await client.auth.signInWithPassword({email:String(fd.get("email")).trim(),password:String(fd.get("password"))});
      if(error)throw error;
      location.href="account.html";
    }catch(err){message(friendlyError(err),true);}
    finally{btn.disabled=false;btn.textContent="ورود به حساب";}
  });
  const register=$("#registerForm");
  if(register)register.addEventListener("submit",async e=>{
    e.preventDefault(); if(!requireClient())return;
    const fd=new FormData(register),name=String(fd.get("fullName")).trim(),email=String(fd.get("email")).trim(),password=String(fd.get("password"));
    if(password!==String(fd.get("confirmPassword"))){message("تکرار رمز عبور با رمز اصلی یکسان نیست.",true);return;}
    const btn=register.querySelector("button");btn.disabled=true;btn.textContent="در حال ایجاد حساب...";
    try{
      const {data,error}=await client.auth.signUp({email,password,options:{data:{full_name:name},emailRedirectTo:location.origin+location.pathname.replace(/register\.html$/,"account.html")}});
      if(error)throw error;
      if(data.session)location.href="account.html";
      else message("ثبت‌نام انجام شد. اگر تأیید ایمیل در Supabase فعال باشد، لینک تأیید برایتان ارسال می‌شود؛ پس از تأیید وارد حساب شوید.");
    }catch(err){message(friendlyError(err),true);}
    finally{btn.disabled=false;btn.textContent="ایجاد حساب";}
  });
  const logout=$("#logoutButton");
  if(logout)logout.addEventListener("click",async()=>{
    if(!requireClient())return;
    logout.disabled=true;
    const {error}=await client.auth.signOut();
    if(error){message(friendlyError(error),true);logout.disabled=false;return;}
    location.href="login.html";
  });
  async function initAccount(){
    if(!$("#accountDetails"))return;
    if(!requireClient())return;
    const {data,error}=await client.auth.getUser();
    if(error||!data.user){location.replace("login.html");return;}
    const u=data.user;
    $("#accountName").textContent=u.user_metadata?.full_name||"کاربر تاسیان";
    $("#accountEmail").textContent=u.email||"—";
    $("#accountId").textContent=u.id;
    $("#accountLoading").hidden=true;$("#accountDetails").hidden=false;
  }
  async function updateHeader(){
    if(!client)return;
    const {data}=await client.auth.getUser();
    document.querySelectorAll("[data-account-link]").forEach(a=>{
      if(data?.user){a.href="account.html";const span=a.querySelector("span");if(span)span.textContent="حساب کاربری";}
    });
  }
  document.addEventListener("DOMContentLoaded",()=>{initAccount();updateHeader();});
})();

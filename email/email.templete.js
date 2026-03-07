export const template = (token) => {
  return `
  <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f4f4;">
    <div style="max-width:500px; margin:auto; background:white; padding:20px; border-radius:8px;">
      
      <h2 style="margin-bottom:10px; color:#333;">🎮 Welcome to Your Favorite Games Store!</h2>
      
      <p>Hi there,</p>

      <p>Thanks for signing up! Please confirm your email to start exploring our amazing games collection.</p>

      <a href="http://localhost:3000/users/verify/${token}"
         style="display:inline-block; margin-top:15px; padding:10px 15px;
         background:#4B0082; color:white; text-decoration:none; border-radius:5px;">
         Confirm Your Email
      </a>

      <p style="margin-top:20px; font-size:12px; color:gray;">
        If you didn't create an account, you can ignore this email.
      </p>

      <p style="margin-top:10px; font-size:12px; color:gray;">
        © 2026 Games Store
      </p>

    </div>
  </div>
  `;
};
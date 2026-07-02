import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Smartphone, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: request OTP, 2: verify OTP, 3: new password, 4: success
  const [method, setMethod] = useState("email"); // email or phone
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2); // Simulated OTP sent
    }, 1000);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Simulated OTP verified
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4); // Simulated password reset
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-900/50 backdrop-blur-xl py-8 px-4 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] border border-primary/20 sm:rounded-2xl sm:px-10">
          
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSendOTP}>
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setMethod("email")}
                  className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${method === 'email' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'}`}
                >
                  <Mail size={16} /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("phone")}
                  className={`flex-1 py-2 px-3 flex items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors ${method === 'phone' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'}`}
                >
                  <Smartphone size={16} /> Mobile
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  {method === "email" ? "Email Address" : "Mobile Number"}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {method === "email" ? <Mail className="h-5 w-5 text-slate-500" /> : <Smartphone className="h-5 w-5 text-slate-500" />}
                  </div>
                  <input
                    type={method === "email" ? "email" : "tel"}
                    required
                    className="block w-full pl-10 bg-slate-950/50 border border-slate-800 rounded-lg py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                    placeholder={method === "email" ? "you@example.com" : "+1 (555) 000-0000"}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-slate-900 transition-all disabled:opacity-50"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" onSubmit={handleVerifyOTP}>
              <div>
                <label className="block text-sm font-medium text-slate-300">Enter OTP sent to {contact}</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    className="block w-full pl-10 bg-slate-950/50 border border-slate-800 rounded-lg py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-center tracking-[0.5em] text-lg"
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {step === 3 && (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label className="block text-sm font-medium text-slate-300">New Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="password"
                    required
                    className="block w-full px-4 bg-slate-950/50 border border-slate-800 rounded-lg py-2.5 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save New Password"}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-medium text-white">Password Reset Successfully</h3>
              <p className="text-sm text-slate-400">You can now login with your new password.</p>
              <Link to="/login" className="mt-6 w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] text-sm font-medium text-white bg-primary hover:bg-primary/90 transition-all">
                Back to Login
              </Link>
            </div>
          )}

          {step < 4 && (
            <div className="mt-6 text-center text-sm">
              <Link to="/login" className="font-medium text-slate-400 hover:text-white transition-colors">
                Back to sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "../services/auth.service";

import { loginSchema, type LoginFormData } from "../validators/auth.schema";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useDebounce } from "@/hooks/useDebounce";

import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const debouncedEmail = useDebounce(emailValue, 400);
  const debouncedPassword = useDebounce(passwordValue, 400);

  const showEmailError = debouncedEmail && errors.email;
  const showPasswordError = debouncedPassword && errors.password;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data.email, data.password);

      if (!res?.success) {
        toast.error(res?.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("userEmail", data.email);

      toast.success("Login successful");

      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  const onInvalid = () => {
    toast.error("Please fix the form errors before submitting");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg border transition-all duration-300 ease-out">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-semibold">
            Welcome back
          </CardTitle>

          <p className="text-sm text-muted-foreground text-center">
            Enter your credentials to access your account
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                className={showEmailError ? "border-red-500" : ""}
              />

              <div className="grid transition-all duration-300 ease-in-out">
                {showEmailError && (
                  <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={
                    showPasswordError ? "border-red-500 pr-10" : "pr-10"
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="grid transition-all duration-300 ease-in-out">
                {showPasswordError && (
                  <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Processing..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            Don't have an account?
            <button
              className="ml-1 font-medium text-primary hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { register as registerUser } from "../services/auth.service";

import {
  registerSchema,
  type RegisterFormData,
} from "../validators/auth.schema";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useDebounce } from "@/hooks/useDebounce";

import { Eye, EyeOff } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const debouncedEmail = useDebounce(emailValue, 400);
  const debouncedPassword = useDebounce(passwordValue, 400);
  const debouncedConfirmPassword = useDebounce(confirmPasswordValue, 400);

  const showEmailError = debouncedEmail && errors.email;
  const showPasswordError = debouncedPassword && errors.password;
  const showConfirmPasswordError =
    debouncedConfirmPassword && errors.confirmPassword;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password);

      toast.success("Account created successfully");

      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
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
            Create account
          </CardTitle>

          <p className="text-sm text-muted-foreground text-center">
            Enter your information to create your account
          </p>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            className="space-y-5"
          >
            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                className={showEmailError ? "border-red-500" : ""}
              />

              <div className="grid transition-all duration-300">
                {showEmailError && (
                  <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
            </div>

            {/* PASSWORD */}
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
                  className="absolute right-3 top-2.5 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="grid transition-all duration-300">
                {showPasswordError && (
                  <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <Label>Confirm password</Label>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className={
                    showConfirmPasswordError ? "border-red-500 pr-10" : "pr-10"
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <div className="grid transition-all duration-300">
                {showConfirmPasswordError && (
                  <p className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            Already have an account?
            <button
              className="ml-1 font-medium text-primary hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;

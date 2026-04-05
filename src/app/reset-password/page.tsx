"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { Loader2, KeyRound, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters").max(128),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type ResetFormData = z.infer<typeof resetSchema>

export default function ResetPasswordPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(true)
  const [isValidToken, setIsValidToken] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (!token) {
      toast.error(t("auth.reset.invalidLink"))
      setTimeout(() => router.push("/login"), 2000)
      return
    }
    setIsValidating(false)
    setIsValidToken(true)
  }, [token, router, t])

  const form = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: ResetFormData) => {
    if (!token) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || t("auth.reset.error"))
        return
      }

      toast.success(t("auth.reset.success"))
      router.push("/login")
    } catch (error) {
      toast.error(t("auth.reset.error"))
    } finally {
      setIsLoading(false)
    }
  }

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (!isValidToken) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{t("auth.reset.invalidLink")}</CardTitle>
          <CardDescription>{t("auth.reset.invalidLinkDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/login">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("auth.reset.backToLogin")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="space-y-1 px-0">
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          {t("auth.reset.title")}
        </CardTitle>
        <CardDescription>
          {t("auth.reset.subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.reset.newPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder={t("auth.reset.newPasswordPlaceholder")}
                        disabled={isLoading}
                        autoComplete="new-password"
                        className="pe-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.reset.confirmPassword")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("auth.reset.confirmPasswordPlaceholder")}
                        disabled={isLoading}
                        autoComplete="new-password"
                        className="pe-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("auth.reset.resetting")}
                </>
              ) : (
                t("auth.reset.submit")
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:text-blue-500 flex items-center justify-center gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            {t("auth.reset.backToLogin")}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Loader2, Github, Chrome, Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [isOAuthLoading, setIsOAuthLoading] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error(t("auth.login.invalidCredentials"))
      } else {
        toast.success(t("auth.login.success"))
        const session = await getSession()
        if (session) {
          router.push("/dashboard")
          router.refresh()
        }
      }
    } catch (error) {
      toast.error(t("auth.login.error"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: string) => {
    setIsOAuthLoading(provider)
    try {
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      toast.error(t("auth.login.oauthError").replace("{provider}", provider))
      setIsOAuthLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-none">
        <CardHeader className="space-y-1 px-0">
          <CardTitle className="text-2xl font-semibold">{t("auth.login.title")}</CardTitle>
          <CardDescription>
            {t("auth.login.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 px-0">
          {error === "OAuthAccountNotLinked" && (
            <div role="alert" className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-800 dark:text-red-200">
                {t("auth.login.oauthNotLinked")}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("google")}
              disabled={isOAuthLoading !== null}
              className="relative"
            >
              {isOAuthLoading === "google" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Chrome className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthSignIn("github")}
              disabled={isOAuthLoading !== null}
              className="relative"
            >
              {isOAuthLoading === "github" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Github className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              GitHub
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-gray-500 dark:text-gray-400">
                {t("auth.login.orContinueWith")}
              </span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">{t("auth.login.email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder={t("auth.login.emailPlaceholder")}
                        disabled={isLoading}
                        autoComplete="email"
                        aria-describedby="email-error"
                      />
                    </FormControl>
                    <FormMessage id="email-error" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">{t("auth.login.password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={t("auth.login.passwordPlaceholder")}
                          disabled={isLoading}
                          autoComplete="current-password"
                          aria-describedby="password-error"
                          className="pe-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 end-0 flex items-center pe-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage id="password-error" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center" aria-live="polite">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    {t("auth.login.signingIn")}
                  </span>
                ) : (
                  t("auth.login.submit")
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="px-0">
          <Link
            href="/reset-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("auth.login.forgotPassword")}
          </Link>
        </CardFooter>
      </Card>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t("auth.login.noAccount")}{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {t("auth.login.signUp")}
        </Link>
      </p>
    </div>
  )
}

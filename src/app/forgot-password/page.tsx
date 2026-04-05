"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotFormData = z.infer<typeof forgotSchema>

export default function ForgotPasswordPage() {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error || t("auth.forgot.error"))
        return
      }

      setIsSent(true)
      toast.success(t("auth.forgot.success"))
    } catch (error) {
      toast.error(t("auth.forgot.error"))
    } finally {
      setIsLoading(false)
    }
  }

  if (isSent) {
    return (
      <Card>
        <CardHeader className="space-y-1 px-0 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>{t("auth.forgot.success")}</CardTitle>
          <CardDescription>
            {t("auth.forgot.success")}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Link href="/login">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("auth.forgot.backToLogin")}
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
          <Mail className="h-5 w-5 text-primary" />
          {t("auth.forgot.title")}
        </CardTitle>
        <CardDescription>
          {t("auth.forgot.subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.forgot.email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("auth.forgot.emailPlaceholder")}
                      disabled={isLoading}
                      autoComplete="email"
                    />
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
                  {t("auth.forgot.sending")}
                </>
              ) : (
                t("auth.forgot.submit")
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
            {t("auth.forgot.backToLogin")}
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

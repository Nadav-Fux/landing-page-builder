import { toast as sonnerToast } from "sonner"

type ToastOptions = {
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  duration?: number
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  isRtl?: boolean
}

export const useToast = () => {
  const toast = {
    success: (message: string, options?: ToastOptions) => {
      const toastOptions: any = {}
      if (options?.description) toastOptions.description = options.description
      if (options?.action) {
        toastOptions.action = {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      }
      if (options?.duration) toastOptions.duration = options.duration
      if (options?.position) toastOptions.position = options.position

      return sonnerToast.success(message, toastOptions)
    },

    error: (message: string, options?: ToastOptions) => {
      const toastOptions: any = {}
      if (options?.description) toastOptions.description = options.description
      if (options?.action) {
        toastOptions.action = {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      }
      if (options?.duration) toastOptions.duration = options.duration
      if (options?.position) toastOptions.position = options.position

      return sonnerToast.error(message, toastOptions)
    },

    warning: (message: string, options?: ToastOptions) => {
      const toastOptions: any = {}
      if (options?.description) toastOptions.description = options.description
      if (options?.action) {
        toastOptions.action = {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      }
      if (options?.duration) toastOptions.duration = options.duration
      if (options?.position) toastOptions.position = options.position

      return sonnerToast.warning(message, toastOptions)
    },

    info: (message: string, options?: ToastOptions) => {
      const toastOptions: any = {}
      if (options?.description) toastOptions.description = options.description
      if (options?.action) {
        toastOptions.action = {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      }
      if (options?.duration) toastOptions.duration = options.duration
      if (options?.position) toastOptions.position = options.position

      return sonnerToast.info(message, toastOptions)
    },

    loading: (message: string, options?: ToastOptions) => {
      const toastOptions: any = {}
      if (options?.description) toastOptions.description = options.description
      if (options?.duration) toastOptions.duration = options.duration
      if (options?.position) toastOptions.position = options.position

      return sonnerToast.loading(message, toastOptions)
    },

    promise: <T>(
      promise: Promise<T>,
      options: {
        loading: string
        success: string | ((data: T) => string)
        error: string | ((error: any) => string)
      } & ToastOptions
    ) => {
      const toastOptions: any = {
        loading: options.loading,
        success: options.success,
        error: options.error,
      }
      if (options?.description) toastOptions.description = options.description
      if (options?.action) {
        toastOptions.action = {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      }
      if (options?.duration) toastOptions.duration = options.duration
      if (options?.position) toastOptions.position = options.position
      if (options?.isRtl !== undefined) toastOptions.dir = options.isRtl ? "rtl" : "ltr"

      return sonnerToast.promise(promise, toastOptions)
    },

    dismiss: (id?: string | number) => {
      sonnerToast.dismiss(id)
    },
  }

  return toast
}

export const toast = useToast()
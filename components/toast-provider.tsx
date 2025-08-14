"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

type ToastContextType = {
  addToast: (message: string, type?: "success" | "error" | "info", duration?: number) => string
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, addToast, removeToast } = useToast()

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 rounded-md px-4 py-3 shadow-lg transition-all ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : toast.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
            }`}
          >
            <span className="text-sm">{toast.message}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={() => removeToast(toast.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToastContext must be used within ToastProvider")
  }
  return context
}

"use client"

import { MoneyInput } from "@/components/money-input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from 'lucide-react'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  amount: z.number()
})

export default function WithdrawalForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(values)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsModalOpen(true)
    }, 2000) // 2 seconds delay to simulate processing
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/5 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Solicitar Saque</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Saque</FormLabel>
                <FormControl>
                <MoneyInput
                    id="offerAmount"
                    value={field.value}
                    onValueChange={({ floatValue }) =>
                      field.onChange(floatValue)
                    }
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando
              </>
            ) : (
              "Solicitar Saque"
            )}
          </Button>
        </form>
      </Form>
      {isLoading && (
        <p className="text-sm text-gray-500 text-center mt-2">
          Por favor, aguarde enquanto processamos sua solicitação...
        </p>
      )}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Saque Solicitado</DialogTitle>
          </DialogHeader>
          <p>
            Seu saque foi solicitado com sucesso. O processamento levará entre 10
            a 15 minutos. Obrigado pela sua paciência!
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}


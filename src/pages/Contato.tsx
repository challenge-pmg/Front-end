import React from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string,
  email: string,
  message: string
}

export default function Contato(){
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormValues>()
  const onSubmit = (data: FormValues) => {
    console.log('Form', data)
    alert('Mensagem enviada (simulada).')
  }
  return (
    <section id="contato" className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-4">Contato</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input {...register('name', { required: 'Nome obrigatório' })} className="mt-1 w-full border p-2 rounded" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input {...register('email', { required: 'E-mail obrigatório', pattern: { value: /\S+@\S+\.\S+/, message: 'E-mail inválido' } })} className="mt-1 w-full border p-2 rounded" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Mensagem</label>
          <textarea {...register('message', { required: 'Mensagem obrigatória' })} className="mt-1 w-full border p-2 rounded" rows={5}></textarea>
          {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
        </div>
        <div>
          <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded">Enviar</button>
          {isSubmitSuccessful && <span className="ml-3 text-green-600">Enviado!</span>}
        </div>
      </form>
    </section>
  )
}

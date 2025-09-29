import React from 'react'

type Props = {
  title: string,
  children?: React.ReactNode
}

export default function Card({title, children}: Props){
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-slate-600 text-sm">{children}</div>
    </div>
  )
}

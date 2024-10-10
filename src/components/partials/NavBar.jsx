import React from 'react'

export default function NavBar() {
  return (
    <nav>
    <ul>
        <li><a href="/admin/imoveis/novo">Criar</a></li>
        <li><a href="/admin/imoveis/lista">Imoveis</a></li>
        <li><a href="/admin/imoveis/vendido">Vendidos</a></li>
    </ul>
</nav>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import {
  Card,
  DataGridActions,
  FilterCard,
  FilterFieldsProvider,
  Nav,
  Navbar,
  useFilter,
} from './components'
import { INav } from './@types/sitemap'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import pessoasJson from './pessoas.json'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'

const sitemap: INav = {
  menu1: {
    name: 'Cadastro',
    items: {
      produto: {
        name: 'Produto',
        items: {
          new: {
            name: 'Novo',
            link: () => '/produto/new',
          },
          list: {
            name: 'Listar',
            handleLink: () => console.log('Function void'),
          },
        },
      },
      ofertas: {
        name: 'Oferta',
        items: {
          new: {
            name: 'Novo',
            link: () => '/ofertas/new',
          },
          list: {
            name: 'Listar',
            handleLink: () => console.log('Function void'),
          },
        },
      },
      pessoas: {
        name: 'Pessoas',
        link: () => '/pessoa',
      },
    },
  },
  menu2: {
    name: 'Configuração',
    items: {
      usuario: {
        name: 'Usuário',
        items: {
          new: {
            name: 'Novo',
            link: () => '/user/new',
          },
          list: {
            name: 'Listar',
            handleLink: () => console.log('Function void'),
          },
        },
      },
      conta: {
        name: 'Conta',
        items: {
          new: {
            name: 'Novo',
            link: () => '/conta/new',
          },
          list: {
            name: 'Listar',
            handleLink: () => console.log('Function void'),
          },
        },
      },
    },
  },
  menu3: {
    name: 'Manutenção',
    handleLink: () => console.log('Function void'),
  },
}

export const model: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: () => <div className="text-right">ID</div>,
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'cpf_cnpj',
    header: () => <div className="text-right">CPF/CNPJ</div>,
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue('cpf_cnpj')}</div>,
  },
  {
    accessorKey: 'nome_completo',
    header: () => <div className="text-right">Nome/Razão Social</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue('nome_completo')}</div>
    ),
  },
  {
    accessorKey: 'telefone',
    header: () => <div className="text-right">Telefone</div>,
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue('telefone')}</div>,
  },
  {
    accessorKey: 'actions',
    header: () => <div className="text-right">Ações</div>,
    cell({ row }) {
      return (
        <DataGridActions.Root params={row} className="gap-3">
          <DataGridActions.Edit />
          <DataGridActions.Delete />
        </DataGridActions.Root>
      )
    },
  },
]

function Page() {
  const { filteredData, loading } = useFilter({ data: pessoasJson as any, model: model })

  const table = useReactTable<any>({
    data: filteredData,
    columns: model,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Navbar.Root className="gap-3">
        <Navbar.Content>
          <Nav
            sitemap={sitemap}
            linkWrapper={(props) => <a {...props}>{props.children}</a>}
            activeOnMouseOver
          />
        </Navbar.Content>
        <Navbar.Right>
          <Navbar.Container title="Aplicação" subtitle="&copy; Adan Einstein - 2023" />
        </Navbar.Right>
      </Navbar.Root>
      <div className="w-screen flex flex-col justify-center items-center">
        <FilterCard.Root
          showTooltip
          filterTrigger="onenter"
          className="md:w-4/6"
          dataModel={model}
          title={<span className="text-2xl font-light">Filtrar</span>}
          titleModal={<span className="text-2xl font-light">Filtrar</span>}
        />
        <Card.Root className="md:w-4/6">
          <Card.Header className="text-2xl font-light">
            <div className="flex flex-row items-center justify-between">Pessoas</div>
          </Card.Header>
          <Card.Body className="h-[480px]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={model.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card.Body>
        </Card.Root>
      </div>
    </div>
  )
}

function App() {
  return (
    <FilterFieldsProvider>
      <Page />
    </FilterFieldsProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

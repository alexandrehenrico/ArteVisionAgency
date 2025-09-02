import { collection, addDoc, getDocs, query, orderBy, Timestamp, doc, updateDoc } from "firebase/firestore"
import { db, auth } from "./firebase"
import type { Cliente, Receita, Despesa, Senha, Projeto, AtividadeProjeto, Orcamento, Recibo } from "./types"

// Clientes
export const adicionarCliente = async (cliente: Omit<Cliente, "id">) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    // Garantir que a data seja válida
    const dataRegistro = cliente.dataRegistro instanceof Date 
      ? cliente.dataRegistro 
      : new Date(cliente.dataRegistro)
    const docRef = await addDoc(collection(db, "clientes"), {
      ...cliente,
      dataRegistro: Timestamp.fromDate(dataRegistro),
      registradoPor: auth.currentUser.displayName || auth.currentUser.email || "Usuário",
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error)
    throw error
  }
}

export const obterClientes = async (): Promise<Cliente[]> => {
  try {
    // Aguarda a inicialização do auth
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      })
    })

    if (!auth.currentUser) {
      console.log("[v0] Usuário não autenticado, retornando array vazio")
      return []
    }

    const q = query(collection(db, "clientes"), orderBy("dataRegistro", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dataRegistro: doc.data().dataRegistro?.toDate() || new Date(),
    })) as Cliente[]
  } catch (error) {
    console.error("Erro ao obter clientes:", error)
    return []
  }
}

// Receitas
export const adicionarReceita = async (receita: Omit<Receita, "id">) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    // Garantir que valor e data sejam válidos
    const valor = typeof receita.valor === 'string' 
      ? parseFloat(receita.valor.replace(',', '.')) 
      : receita.valor
    const data = receita.data instanceof Date 
      ? receita.data 
      : new Date(receita.data)
    const docRef = await addDoc(collection(db, "receitas"), {
      ...receita,
      valor,
      data: Timestamp.fromDate(data),
      registradoPor: auth.currentUser.displayName || auth.currentUser.email || "Usuário",
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar receita:", error)
    throw error
  }
}

export const obterReceitas = async (): Promise<Receita[]> => {
  try {
    // Aguarda a inicialização do auth
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      })
    })

    if (!auth.currentUser) {
      console.log("[v0] Usuário não autenticado, retornando array vazio")
      return []
    }

    const q = query(collection(db, "receitas"), orderBy("data", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      data: doc.data().data?.toDate() || new Date(),
    })) as Receita[]
  } catch (error) {
    console.error("Erro ao obter receitas:", error)
    return []
  }
}

// Despesas
export const adicionarDespesa = async (despesa: Omit<Despesa, "id">) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    // Garantir que valor e data sejam válidos
    const valor = typeof despesa.valor === 'string' 
      ? parseFloat(despesa.valor.replace(',', '.')) 
      : despesa.valor
    const data = despesa.data instanceof Date 
      ? despesa.data 
      : new Date(despesa.data)
    const docRef = await addDoc(collection(db, "despesas"), {
      ...despesa,
      valor,
      data: Timestamp.fromDate(data),
      registradoPor: auth.currentUser.displayName || auth.currentUser.email || "Usuário",
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar despesa:", error)
    throw error
  }
}

export const obterDespesas = async (): Promise<Despesa[]> => {
  try {
    // Aguarda a inicialização do auth
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      })
    })

    if (!auth.currentUser) {
      console.log("[v0] Usuário não autenticado, retornando array vazio")
      return []
    }

    const q = query(collection(db, "despesas"), orderBy("data", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      data: doc.data().data?.toDate() || new Date(),
    })) as Despesa[]
  } catch (error) {
    console.error("Erro ao obter despesas:", error)
    return []
  }
}

// Senhas
export const adicionarSenha = async (senha: Omit<Senha, "id">) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    // Garantir que a data seja válida
    const dataRegistro = senha.dataRegistro instanceof Date 
      ? senha.dataRegistro 
      : new Date(senha.dataRegistro)
    const docRef = await addDoc(collection(db, "senhas"), {
      ...senha,
      dataRegistro: Timestamp.fromDate(dataRegistro),
      registradoPor: auth.currentUser.displayName || auth.currentUser.email || "Usuário",
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar senha:", error)
    throw error
  }
}

export const obterSenhas = async (): Promise<Senha[]> => {
  try {
    if (!auth.currentUser) {
      console.log("[v0] Usuário não autenticado, retornando array vazio")
      return []
    }

    const q = query(collection(db, "senhas"), orderBy("dataRegistro", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dataRegistro: doc.data().dataRegistro?.toDate() || new Date(),
    })) as Senha[]
  } catch (error) {
    console.error("Erro ao obter senhas:", error)
    return []
  }
}

// Projetos
export const adicionarProjeto = async (projeto: Omit<Projeto, "id">) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    // Garantir que as datas sejam válidas
    const dataInicio = projeto.dataInicio instanceof Date 
      ? projeto.dataInicio 
      : new Date(projeto.dataInicio)
    const dataPrevisao = projeto.dataPrevisao 
      ? (projeto.dataPrevisao instanceof Date ? projeto.dataPrevisao : new Date(projeto.dataPrevisao))
      : null
    const dataEntrega = projeto.dataEntrega 
      ? (projeto.dataEntrega instanceof Date ? projeto.dataEntrega : new Date(projeto.dataEntrega))
      : null
    
    // Garantir que o valor seja um número válido
    const valor = projeto.valor 
      ? (typeof projeto.valor === 'string' ? parseFloat(projeto.valor.replace(',', '.')) : projeto.valor)
      : undefined
    const docRef = await addDoc(collection(db, "projetos"), {
      ...projeto,
      valor,
      dataInicio: Timestamp.fromDate(dataInicio),
      dataPrevisao: dataPrevisao ? Timestamp.fromDate(dataPrevisao) : null,
      dataEntrega: dataEntrega ? Timestamp.fromDate(dataEntrega) : null,
      registradoPor: auth.currentUser.displayName || auth.currentUser.email || "Usuário",
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar projeto:", error)
    throw error
  }
}

export const obterProjetos = async (): Promise<Projeto[]> => {
  try {
    if (!auth.currentUser) {
      console.log("[v0] Usuário não autenticado, retornando array vazio")
      return []
    }

    const q = query(collection(db, "projetos"), orderBy("dataInicio", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dataInicio: doc.data().dataInicio?.toDate() || new Date(),
      dataPrevisao: doc.data().dataPrevisao?.toDate() || undefined,
      dataEntrega: doc.data().dataEntrega?.toDate() || undefined,
    })) as Projeto[]
  } catch (error) {
    console.error("Erro ao obter projetos:", error)
    return []
  }
}

export const atualizarStatusProjeto = async (projetoId: string, status: Projeto['status'], dataEntrega?: Date) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    const updateData: any = { status }
    if (status === 'entregue' && dataEntrega) {
      updateData.dataEntrega = Timestamp.fromDate(dataEntrega)
    }

    const docRef = doc(db, "projetos", projetoId)
    await updateDoc(docRef, updateData)
  } catch (error) {
    console.error("Erro ao atualizar status do projeto:", error)
    throw error
  }
}
// Atividades do Projeto
export const adicionarAtividadeProjeto = async (atividade: Omit<AtividadeProjeto, "id">) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    // Garantir que as datas sejam válidas
    const dataCriacao = atividade.dataCriacao instanceof Date 
      ? atividade.dataCriacao 
      : new Date(atividade.dataCriacao)
    const dataConclusao = atividade.dataConclusao 
      ? (atividade.dataConclusao instanceof Date ? atividade.dataConclusao : new Date(atividade.dataConclusao))
      : null
    const docRef = await addDoc(collection(db, "atividades_projetos"), {
      ...atividade,
      dataCriacao: Timestamp.fromDate(dataCriacao),
      dataConclusao: dataConclusao ? Timestamp.fromDate(dataConclusao) : null,
      registradoPor: auth.currentUser.displayName || auth.currentUser.email || "Usuário",
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar atividade do projeto:", error)
    throw error
  }
}

export const obterAtividadesProjeto = async (projetoId: string): Promise<AtividadeProjeto[]> => {
  try {
    if (!auth.currentUser) {
      console.log("[v0] Usuário não autenticado, retornando array vazio")
      return []
    }

    const q = query(
      collection(db, "atividades_projetos"),
      orderBy("dataCriacao", "asc")
    )
    const querySnapshot = await getDocs(q)
    const atividades = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        dataCriacao: doc.data().dataCriacao?.toDate() || new Date(),
        dataConclusao: doc.data().dataConclusao?.toDate() || undefined,
      })) as AtividadeProjeto[]
    
    return atividades.filter(atividade => atividade.projetoId === projetoId)
  } catch (error) {
    console.error("Erro ao obter atividades do projeto:", error)
    return []
  }
}

export const atualizarAtividadeProjeto = async (atividadeId: string, concluida: boolean) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    const updateData: any = { 
      concluida,
      dataConclusao: concluida ? Timestamp.fromDate(new Date()) : null
    }

    const docRef = doc(db, "atividades_projetos", atividadeId)
    await updateDoc(docRef, updateData)
  } catch (error) {
    console.error("Erro ao atualizar atividade do projeto:", error)
    throw error
  }
}

// Orçamentos
export const adicionarOrcamento = async (orcamento: Omit<Orcamento, "id">) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    // Garantir que valores numéricos e datas sejam válidos
    const subtotal = typeof orcamento.subtotal === 'string' 
      ? parseFloat(orcamento.subtotal.replace(',', '.')) 
      : orcamento.subtotal
    const desconto = typeof orcamento.desconto === 'string' 
      ? parseFloat(orcamento.desconto.replace(',', '.')) 
      : orcamento.desconto
    const valorTotal = typeof orcamento.valorTotal === 'string' 
      ? parseFloat(orcamento.valorTotal.replace(',', '.')) 
      : orcamento.valorTotal
    const dataCriacao = orcamento.dataCriacao instanceof Date 
      ? orcamento.dataCriacao 
      : new Date(orcamento.dataCriacao)
    const dataVencimento = orcamento.dataVencimento instanceof Date 
      ? orcamento.dataVencimento 
      : new Date(orcamento.dataVencimento)
    
    // Processar itens para garantir valores numéricos corretos
    const itensProcessados = orcamento.itens.map(item => ({
      ...item,
      quantidade: typeof item.quantidade === 'string' 
        ? parseFloat(item.quantidade.replace(',', '.')) 
        : item.quantidade,
      valorUnitario: typeof item.valorUnitario === 'string' 
        ? parseFloat(item.valorUnitario.replace(',', '.')) 
        : item.valorUnitario,
      valorTotal: typeof item.valorTotal === 'string' 
        ? parseFloat(item.valorTotal.replace(',', '.')) 
        : item.valorTotal,
    }))
    const docRef = await addDoc(collection(db, "orcamentos"), {
      ...orcamento,
      subtotal,
      desconto,
      valorTotal,
      itens: itensProcessados,
      dataCriacao: Timestamp.fromDate(dataCriacao),
      dataVencimento: Timestamp.fromDate(dataVencimento),
      registradoPor: auth.currentUser.displayName || auth.currentUser.email || "Usuário",
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar orçamento:", error)
    throw error
  }
}

export const obterOrcamentos = async (): Promise<Orcamento[]> => {
  try {
    if (!auth.currentUser) {
      console.log("[v0] Usuário não autenticado, retornando array vazio")
      return []
    }

    const q = query(collection(db, "orcamentos"), orderBy("dataCriacao", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dataCriacao: doc.data().dataCriacao?.toDate() || new Date(),
      dataVencimento: doc.data().dataVencimento?.toDate() || new Date(),
    })) as Orcamento[]
  } catch (error) {
    console.error("Erro ao obter orçamentos:", error)
    return []
  }
}

export const atualizarOrcamento = async (orcamentoId: string, dados: Partial<Orcamento>) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    const updateData: any = { ...dados }
    if (dados.dataVencimento) {
      updateData.dataVencimento = Timestamp.fromDate(dados.dataVencimento)
    }

    const docRef = doc(db, "orcamentos", orcamentoId)
    await updateDoc(docRef, updateData)
  } catch (error) {
    console.error("Erro ao atualizar orçamento:", error)
    throw error
  }
}

export const atualizarStatusOrcamento = async (orcamentoId: string, status: Orcamento['status']) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    const docRef = doc(db, "orcamentos", orcamentoId)
    await updateDoc(docRef, { status })
  } catch (error) {
    console.error("Erro ao atualizar status do orçamento:", error)
    throw error
  }
}
// Adicione estas funções ao final do seu arquivo /lib/database.ts

// Recibos
export const adicionarRecibo = async (recibo: Omit<Recibo, "id">) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    // Garantir que valor e datas sejam válidos
    const valorPago = typeof recibo.valorPago === 'string' 
      ? parseFloat(recibo.valorPago.replace(',', '.')) 
      : recibo.valorPago
    const dataPagamento = recibo.dataPagamento instanceof Date 
      ? recibo.dataPagamento 
      : new Date(recibo.dataPagamento)
    const dataVencimento = recibo.dataVencimento 
      ? (recibo.dataVencimento instanceof Date ? recibo.dataVencimento : new Date(recibo.dataVencimento))
      : null
    const dataCriacao = recibo.dataCriacao instanceof Date 
      ? recibo.dataCriacao 
      : new Date(recibo.dataCriacao)
    const docRef = await addDoc(collection(db, "recibos"), {
      ...recibo,
      valorPago,
      dataPagamento: Timestamp.fromDate(dataPagamento),
      dataVencimento: dataVencimento ? Timestamp.fromDate(dataVencimento) : null,
      dataCriacao: Timestamp.fromDate(dataCriacao),
      registradoPor: auth.currentUser.displayName || auth.currentUser.email || "Usuário",
    })
    return docRef.id
  } catch (error) {
    console.error("Erro ao adicionar recibo:", error)
    throw error
  }
}

export const obterRecibos = async (): Promise<Recibo[]> => {
  try {
    // Aguarda a inicialização do auth
    await new Promise((resolve) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      })
    })

    if (!auth.currentUser) {
      console.log("[v0] Usuário não autenticado, retornando array vazio")
      return []
    }

    const q = query(collection(db, "recibos"), orderBy("dataCriacao", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      dataPagamento: doc.data().dataPagamento?.toDate() || new Date(),
      dataVencimento: doc.data().dataVencimento?.toDate() || undefined,
      dataCriacao: doc.data().dataCriacao?.toDate() || new Date(),
    })) as Recibo[]
  } catch (error) {
    console.error("Erro ao obter recibos:", error)
    return []
  }
}

export const atualizarRecibo = async (reciboId: string, dados: Partial<Recibo>) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    const updateData: any = { ...dados }
    if (dados.dataPagamento) {
      updateData.dataPagamento = Timestamp.fromDate(dados.dataPagamento)
    }
    if (dados.dataVencimento) {
      updateData.dataVencimento = Timestamp.fromDate(dados.dataVencimento)
    }

    const docRef = doc(db, "recibos", reciboId)
    await updateDoc(docRef, updateData)
  } catch (error) {
    console.error("Erro ao atualizar recibo:", error)
    throw error
  }
}

export const atualizarStatusRecibo = async (reciboId: string, status: Recibo['status']) => {
  try {
    if (!auth.currentUser) {
      throw new Error("Usuário não autenticado")
    }

    const docRef = doc(db, "recibos", reciboId)
    await updateDoc(docRef, { status })
  } catch (error) {
    console.error("Erro ao atualizar status do recibo:", error)
    throw error
  }
}
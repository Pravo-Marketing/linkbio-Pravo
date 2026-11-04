/* =====================================================
   JUAN — LINKS | LINKS PARA EDITAR E PRODUTOS
   Este é o único arquivo que você normalmente precisa editar.

   Regras:
   - use URLs completas começando com https://
   - deixe "SEU-LINK-AQUI" enquanto um destino não estiver pronto
   - para adicionar um produto, duplique um objeto dentro de products
   - a ordem da lista define a ordem da vitrine; o primeiro abre em destaque
   - imagens: 1600 x 900 px (16:9), preferencialmente WebP
   - salve em assets/ e preencha image; vazio usa a arte provisória
   ===================================================== */

window.JUAN_CONFIG = {
  links: {
    pravo: 'https://pravo.com.br',
    whatsapp: 'SEU-LINK-AQUI',
    instagram: 'SEU-LINK-AQUI',
    tiktok: 'SEU-LINK-AQUI',
    youtube: 'SEU-LINK-AQUI'
  },

  products: [
    {
      title: 'Personagens Realistas com IA',
      description: 'Aprenda a transformar personagens em versões realistas com inteligência artificial.',
      image: 'assets/personagens-realistas.png',
      imageAlt: 'Capa de Personagens Realistas com IA: Megamente dividido entre versão animada e realista',
      label: 'Conhecer produto',
      url: 'SEU-LINK-AQUI'
    },
    {
      title: 'Dê vida ao seu personagem',
      description: 'Aprenda a colocar a mesma personagem em novas poses, roupas e ambientes, preservando sua identidade.',
      image: 'assets/de-vida-ao-personagem.png',
      imageAlt: 'Capa de Dê vida ao seu personagem: a mesma personagem em três poses e estilos diferentes',
      label: 'Conhecer produto',
      url: 'SEU-LINK-AQUI'
    }

    // Exemplo para um novo produto:
    // ,{
    //   title: 'Nome do produto',
    //   description: 'Uma descrição curta e objetiva.',
    //   image: 'assets/seu-produto.webp',
    //   imageAlt: 'Descreva o resultado mostrado na imagem.',
    //   label: 'Ver produto',
    //   url: 'https://seulink.com'
    // }
  ]
};

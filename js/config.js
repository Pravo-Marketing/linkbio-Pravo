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
    whatsapp: 'https://wa.me/5511932534072?text=Ol%C3%A1%2C%20Juan%21%20Vim%20pela%20bio%20do%20seu%20Instagram%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os%20e%20produtos%20digitais.',
    instagram: 'https://www.instagram.com/juanmillanfs/',
    tiktok: 'https://www.tiktok.com/@juanmillanfs',
    youtube: 'https://youtube.com/@juanmillan-ads?si=oeZc_HcnRG0aOwrj'
  },

  products: [
    {
      title: 'Personagens Realistas com IA',
      description: 'Aprenda a transformar personagens em versões realistas com inteligência artificial.',
      image: 'assets/personagens-realistas.png',
      imageAlt: 'Capa de Personagens Realistas com IA: Megamente dividido entre versão animada e realista',
      label: 'Conhecer produto',
      url: 'https://payment.ticto.app/O31DF6970'
    },
    {
      title: 'Dê vida ao seu personagem',
      description: 'Aprenda a colocar a mesma personagem em novas poses, roupas e ambientes, preservando sua identidade.',
      image: 'assets/de-vida-ao-personagem.png',
      imageAlt: 'Capa de Dê vida ao seu personagem: a mesma personagem em três poses e estilos diferentes',
      label: 'Conhecer produto',
      url: 'https://payment.ticto.app/OA058D3E3'
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

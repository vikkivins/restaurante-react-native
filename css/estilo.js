import { StyleSheet } from 'react-native';

export const cores = {
  amareloPrimario: '#ff9b21',
  rosaClaro: '#FFB5E8',
  rosaMedio: '#FF69B4',
  roxoEscuro: '#4A1942',
  amareloClaro: '#FFE4B5',
  branco: '#FFFFFF',
  cinzaClaro: '#F5F5F5',
};

export default StyleSheet.create({
   splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf5e2',// Cor do background (você pode alterar)
  },
  textContainer: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.0)', // Fundo semitransparente para texto (opcional)
  },
  container: {
    flex: 1,
    backgroundColor: cores.branco,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: cores.cinzaClaro,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: cores.amareloPrimario,
  },
  btnenviar: {
    width: '100%',
    height: 50,
    backgroundColor: cores.amareloPrimario,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btntxtenviar: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 24,
    color: cores.roxoEscuro,
    fontWeight: 'bold',
    marginBottom: 30,
  },
    listContainer: {
    padding: 16,
    width: '100%',
  },
  card: {
    backgroundColor: cores.branco,
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  cardContent: {
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardInfo: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.roxoEscuro,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: cores.amareloPrimario,
  },
  actionButtons: {
  flexDirection: 'row', // Posiciona os itens lado a lado
  justifyContent: 'center', // Centraliza os botões horizontalmente
  alignItems: 'center', // Centraliza os itens verticalmente
  marginTop: 8,
  marginBottom: 5,
  },
  button: {
    backgroundColor: '#ff9b21', // Mesma cor do contorno
    borderWidth: 2, // Adiciona o contorno
    borderColor: '#ff9b21', // Cor do contorno
    borderRadius: 100, // Botões redondos
    padding: 10, // Espaçamento interno para maior área de clique
    marginHorizontal: 20, // Espaço entre os botões
    justifyContent: 'center', // Centraliza o conteúdo dentro do botão
    alignItems: 'center',
  },
});
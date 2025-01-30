import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from './components/ThemedText';
import { useThemeColors } from './hooks/useThemeColors';
import Card from './components/Card';
import PokemonCard from './components/pokemon/PokemonCard';
import { useFetchQuery, useInfiniteFetchQuery } from './hooks/useFetchQuery';
import { getPokemonId } from './functions/pokemon';

export default function Index() {
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery('/pokemon?limit=21');
  console.log(data);

  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <SafeAreaView style={[style.container, { backgroundColor: colors.tint }]}>
      <View style={[style.header]}>
        <Image
          source={require('@/assets/images/Pokeball.png')}
          width={24}
          height={24}
        ></Image>
        <ThemedText variant="headline" color="grayWhite">
          Pokedex
        </ThemedText>
      </View>
      <Card style={style.body}>
        <FlatList
          style={[style.list]}
          data={pokemons}
          renderItem={({ item }) => (
            <PokemonCard
              id={getPokemonId(item.url)}
              name={item.name}
              style={style.card}
            />
          )}
          keyExtractor={(item) => item.url}
          ListFooterComponent={
            isFetching ? (
              <ActivityIndicator color={colors.tint}></ActivityIndicator>
            ) : null
          }
          onEndReached={() => fetchNextPage()}
          numColumns={3}
          columnWrapperStyle={style.gridgap}
          contentContainerStyle={style.gridgap}
        />
      </Card>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  body: {
    flex: 1,
  },
  gridgap: {
    gap: 8,
  },
  card: {
    width: '32%',
  },
  list: {
    paddingBlock: 24,
    paddingInline: 12,
  },
});

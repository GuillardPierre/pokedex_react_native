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
import Searchbar from './components/SearchBar';
import React from 'react';
import Row from './components/row';
import SortButton from './components/SortButton';

export default function Index() {
  const [search, setSearch] = React.useState('');
  const [sortKey, setSortKey] = React.useState<'id' | 'name'>('id');
  const colors = useThemeColors();
  const { data, isFetching, fetchNextPage } =
    useInfiniteFetchQuery('/pokemon?limit=21');

  const pokemons =
    data?.pages.flatMap((page) =>
      page.results.map((r) => ({ name: r.name, id: getPokemonId(r.url) })),
    ) ?? [];
  const filtredPokemons = [
    ...(search
      ? pokemons.filter(
          (p) =>
            p.name.includes(search.toLowerCase()) || p.id.toString() === search,
        )
      : pokemons),
  ].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));

  return (
    <SafeAreaView style={[style.container, { backgroundColor: colors.tint }]}>
      <Row style={[style.header]}>
        <Image
          source={require('@/assets/images/Pokeball.png')}
          width={24}
          height={24}
        ></Image>
        <ThemedText variant="headline" color="grayWhite">
          Pokedex
        </ThemedText>
      </Row>
      <Row gap={16} style={style.form}>
        <Searchbar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={style.body}>
        <FlatList
          style={[style.list]}
          data={filtredPokemons}
          renderItem={({ item }) => (
            <PokemonCard id={item.id} name={item.name} style={style.card} />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            isFetching ? (
              <ActivityIndicator color={colors.tint}></ActivityIndicator>
            ) : null
          }
          onEndReached={search ? undefined : () => fetchNextPage()}
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
    gap: 16,
    padding: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  body: {
    flex: 1,
    marginTop: 16,
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
  form: {
    paddingHorizontal: 12,
  },
});

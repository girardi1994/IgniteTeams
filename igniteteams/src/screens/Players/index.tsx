import { FlatList, Alert, TextInput } from "react-native";
import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import React, { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "../../../src/Utils/appError";
import { playerAddByGroup } from "../../../src/Storage/player/playerAddByGroup";
import { PlayersGetByGroupAndTeam } from "../../../src/Storage/player/playersGetByGroupsAndTeam";
import { PlayerStorageDTO } from "../../../src/Storage/player/playerStorageDTO";
import { playerRemoveByGroup } from "../../../src/Storage/player/playerRemoveByGroup";
import { groupRemove } from "../../../src/Storage/group/groupRemove";

type RouteParams = {
  group: string;
};

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const newPlayerNameImputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    };
    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameImputRef.current?.blur();

      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        Alert.alert("Nova pessoa", "Não foi possível adicionar");
      }
    }
  }
  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await PlayersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado"
      );
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.");
    }
  }
  async function groupByRemove() {
    try {
      await groupRemove(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Remover grupo", "Não foi possível remover grupo.");
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", "Deseja remover o grupo?", [
      { text: "Não", style: "cancel" },
      { text: "sim", onPress: () => groupByRemove() },
    ]);
  }
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <HighLight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameImputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button
        title="Remover Turma"
        type="SECUNDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}

# scripts/generate_pokemons_with_desc.py

import os
import json
import requests

def get_flavor_text(species_data):
    # prova prima in italiano, altrimenti in inglese
    for entry in species_data["flavor_text_entries"]:
        if entry["language"]["name"] == "it":
            return entry["flavor_text"].replace("\n", " ").replace("\f", " ")
    for entry in species_data["flavor_text_entries"]:
        if entry["language"]["name"] == "en":
            return entry["flavor_text"].replace("\n", " ").replace("\f", " ")
    return ""

def main():
    # 1) prendi la lista dei primi 100 Pokémon
    list_resp = requests.get("https://pokeapi.co/api/v2/pokemon?limit=100")
    list_resp.raise_for_status()
    pokes = list_resp.json()["results"]

    results = []
    for p in pokes:
        # 2) fetch dati base e dati species
        data = requests.get(p["url"]).json()
        species = requests.get(data["species"]["url"]).json()

        # 3) estrai tipi (es. ["grass","poison"])
        types = [t["type"]["name"] for t in data["types"]]

        # 4) costruisci l’oggetto finale
        results.append({
            "name":        data["name"],
            "image":       f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/{data['id']}.svg",
            "experience":  data.get("base_experience", 0),
            "description": get_flavor_text(species),
            "types":       types
        })

    # 5) scrivi il JSON in public/dati/pokemons.json
    out_dir = os.path.join("public", "dati")
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "pokemons.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print("✅ public/dati/pokemons.json creato con campo `types` aggiunto")

if __name__ == "__main__":
    main()

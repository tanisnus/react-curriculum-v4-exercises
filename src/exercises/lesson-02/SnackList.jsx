function SnackList() {
  const mySnackList = [
    { name: 'Apple Slices', rank: 5 },
    { name: 'Doritos', rank: 4 },
    { name: 'Pringles', rank: 3 },
    { name: 'Lays', rank: 2 },
    { name: 'Pocky', rank: 1 },
  ];

  const sortedSnackList = [...mySnackList].sort((a, b) => a.rank - b.rank);

  return (
    <div>
      <ol>
        {sortedSnackList.map((snack) => (
          <li key={snack.name}>{snack.name}</li>
        ))}
      </ol>
    </div>
  );
}

export default SnackList;

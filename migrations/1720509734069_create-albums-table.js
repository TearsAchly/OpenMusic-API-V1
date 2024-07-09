exports.up = (pgm) => {
  // Membuat tabel 'albums'
  pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  // Menghapus tabel 'albums'
  pgm.dropTable('albums');
};

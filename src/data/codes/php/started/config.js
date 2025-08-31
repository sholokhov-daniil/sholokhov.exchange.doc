export const hash = `
use Ramsey\\Uuid\\Uuid;

$config = [
    'hash' => 'your_exchange_id'
];

new Exchange($config);


$config2 = [
    'hash' => Uuid::uuid5(Uuid::NAMESPACE_OID, 'my-key')->toString(),
];

new Exchange($config2);
`;
export const deactivate = `
$config = [
    'deactivate' => true,
];

new Exchange($config);
`;

export const setResult = `
$exchange = new Exchange;
$exchange->setResultRepositoryFactory($callback);
`


export const map = `
use Sholokhov\\Exchange\\Fields\\Field;
use Sholokhov\\Exchange\\Fields\\IBlock\\IBlockElementField;
use Sholokhov\\Exchange\\Factory\\Exchange\\MapperFactory;

$source = [
    [
        'name' => 'Название элемента',
        'price' => 15.2
    ],
    [
        'name' => 'Еще какой-то товар',
        'price' => 17.2,
    ],
    [
        'name' => 'Хороший товар',
        'price' => 15.2,
        'image' => 'https://example/upload/image.png'
    ]
];

$map = [
    (new Field)
        ->setFrom('name')
        ->setTo('NAME')
        ->setPrimary(),
    (new IBlockElementField)
        ->setFrom('image')
        ->setTo('MORE_PHOTO')
];

$repository = MapperFactory::create();
$repository->setFields($map);

$exchange->setMappingRegistry($repository);
$exchange->execute($source);
`;
export const logger = `
/** @var Psr\\Log\\LoggerInterface $logger **/
$logger = new YourLogger;

$exchange = new Exchange;
$exchange->setLogger($logger);
`;

export const preparation = `
// Будет вызываться вторым
$exchange->addPrepared($myPreparation);

// Будет вызываться первым
$exchange->addPrepared($preparation2);
`;
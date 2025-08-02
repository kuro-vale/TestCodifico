namespace TestCodifico.Tests.Fixtures;

[CollectionDefinition("Api")]
public class ApiTestCollection : ICollectionFixture<TestAppFactory<Program>>
{
    // This class has no code and is never created. Its purpose is simply
    // to be the place to apply [CollectionDefinition] and all the
    // ICollectionFixture<> interfaces.
}
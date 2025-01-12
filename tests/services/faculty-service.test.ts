import DocumentStatus from "../../src/enums/document-status";
import { mapDocumentsToFaculties } from "../../src/mappers/faculty-mapper";
import FacultyModel from "../../src/models/faculty-model";
import * as facultyService from "../../src/services/faculty-service";

jest.mock('../../src/models/faculty-model', () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../../src/mappers/faculty-mapper', () => ({
  mapDocumentsToFaculties: jest.fn(),
  mapDocumentToFaculty: jest.fn(),
}));

describe('faculty', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should get no faculties', async () => {
    // Arrange
    const mockFind = {
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue([]),
    };

    (FacultyModel.find as jest.Mock).mockReturnValue(mockFind);
    (mapDocumentsToFaculties as jest.Mock).mockReturnValueOnce([]);

    // Act
    const faculties = await facultyService.getFaculties(0, 10);
    
    // Assert
    expect(FacultyModel.find).toHaveBeenCalledWith(
      { status: DocumentStatus.Active },
      { name: 1, status: 1 }
    );
    expect(FacultyModel.find).toHaveBeenCalledTimes(1);
    expect(mapDocumentsToFaculties).toHaveBeenCalledWith([]);
    expect(faculties).toEqual([]);
  });

});

using MyGarden.API.DTO;
using MyGarden.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyGarden.DAL
{
    public interface IIssueRepository
    {
        Task<IEnumerable<Issue>> List();

        Task<NewIssueResponse> CreateIssueForPlant(NewIssueModel issue);

        Task<Answer> AddAnswerToIssue(int issueId, string answerText, int userId);

        Task<Issue> GetIssueById(int id);

        Task<Issue> ToggleIssueIsOpen(int id);
    }
}
